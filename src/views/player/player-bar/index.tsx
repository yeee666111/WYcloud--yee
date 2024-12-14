import { memo, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { PlayBarWrapper, BarControl, BarPlayInfo, BarOperator } from './style'
import { NavLink } from 'react-router-dom'
import { Slider, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import { formatImgUrl } from '@/utils/format'
import { shallowEqual } from 'react-redux'
import { getPlayerUrl, formatDuration } from '@/utils/format'
import {
  ActionToLyric,
  ActionToPlayMode,
  changeMusicAction
} from '../store-song/index'
interface Iprops {
  children?: ReactNode
}

const PlayerBar: React.FunctionComponent<Iprops> = (props: Iprops) => {
  //控制音乐播放
  const [isPlaying, setIsPlaying] = useState(false)
  //管理音乐时长
  const [duration, setDuration] = useState(0)
  //管理音乐播放进度
  const [progress, setProgress] = useState(0)
  //记录当前音乐播放时间
  const [currentTime, setCurrentTime] = useState(0)
  //记录当前状态是否为拖拽状态  避免拖拽时出现进度条来回跳转
  const [isSlidering, setIsSlidering] = useState(false)
  //获取audio  dom元素
  const audioRef = useRef<HTMLAudioElement>(null)
  //获取歌词记录指引
  const dispatch = useAppDispatch()
  //获取音乐数据
  const { currentSong, songlyric, lyricIndex, playMode, playSongList } =
    useAppSelector(
      (state) => ({
        currentSong: state.player.currentSong,
        songlyric: state.player.songlyric,
        lyricIndex: state.player.lyricIndex,
        playMode: state.player.playMode,
        playSongList: state.player.playSongList
      }),
      shallowEqual
    )

  //歌曲播放
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = getPlayerUrl(currentSong.id)
    audioRef.current
      .play()
      .then(() => {
        console.log('播放成功')
        setIsPlaying(true)
      })
      .catch((err) => {
        console.log('播放失败:', err)
        setIsPlaying(false)
      })
    setDuration(currentSong.dt)
  }, [currentSong])

  //歌曲暂停播放处理函数
  function handlerPlayBtnPauseClick() {
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))
    setIsPlaying(!isPlaying)
  }
  //歌曲播放处理
  function handleTimeUpdate() {
    //拿到当前歌曲播放时间
    const currentTime = audioRef.current!.currentTime
    if (!isSlidering) {
      const progress = ((currentTime * 1000) / duration) * 100 // *100 代表获取百分比
      //记录当前音乐进程
      setProgress(progress)
      //记录当前播放时间
      setCurrentTime(currentTime * 1000) //保持单位一致
    }

    //对歌词的算法处理
    let index = -1
    for (let i = 0; i < songlyric.length; i++) {
      const lyric = songlyric[i]
      if (lyric.time > currentTime * 1000) {
        index = i - 1
        break
      }
    }
    //将歌词记录在store中 进行后续展示和性能优化 避免多次打印重复歌词 return执行后 后续代码不执行
    if (lyricIndex === index || index === -1) return
    dispatch(ActionToLyric(index))
    //展示歌词通过antd message
    message.open({
      content: songlyric[index].text,
      key: 'lyric',
      duration: 0
    })
  }
  //slider封装的函数实现点击跳转功能
  function handleSliderChange(value: number) {
    const currentTime = (value / 100) * duration //由比例计算出点击的总时长
    audioRef.current!.currentTime = currentTime / 1000 //audio.currentTime 单位为秒  该步为设置音乐播放声音的跳转
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSlidering(false)
  }
  //slider封装的函数实现进度条拖拽功能
  function handleSliderChanging(value: number) {
    setIsSlidering(true)
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
    setProgress(value)
  }
  //对歌曲播放模式的切换
  function handlePlayMode() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    //根据store中数据管理进行切换 不是直接通过点击切换
    dispatch(ActionToPlayMode(newPlayMode))
  }
  //歌曲播放模式的实现
  function handlePlayBtnClick(isNext = true) {
    dispatch(changeMusicAction(isNext))
  }
  //对歌曲播放完成的处理
  function handleTimeEnded() {
    if (playMode === 2 || playSongList.length === 1) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handlePlayBtnClick(true)
    }
  }
  return (
    <PlayBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handlePlayBtnClick(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlerPlayBtnPauseClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handlePlayBtnClick()}
          ></button>
        </BarControl>
        <BarPlayInfo>
          <NavLink to="/discover/player">
            <img src={formatImgUrl(currentSong?.al?.picUrl, 40)} alt="" />
          </NavLink>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              {/* 注意此处的ar?.[0]?为判断服务器是否返回数据操作  必须知道 */}
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/* slider */}
              <Slider
                value={progress}
                step={0.7}
                tooltip={{ formatter: null }}
                onAfterChange={handleSliderChange}
                onChange={handleSliderChanging}
              />
              <div className="time">
                <span className="current">{formatDuration(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatDuration(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayInfo>
        <BarOperator playMode={playMode}>
          <div className="left">
            <button className="btn  pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button
              className="btn sprite_playbar loop"
              onClick={handlePlayMode}
            ></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}
      />
    </PlayBarWrapper>
  )
}

export default memo(PlayerBar)

// useEffect(() => {
//   audioRef.current!.src = getPlayerUrl(currentSong.id)
//   audioRef.current
//     ?.play()
//     .then(() => {
//       setIsPlaying(true)
//       console.log('播放成功')
//     })
//     .catch((error) => {
//       setIsPlaying(false)
//       console.log('播放失败', error)
//     })

//   //获取音乐总时长
//   setDuration(currentSong.dt)
// }, [currentSong])
