import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCurrentSong, getSongLyric } from '../sevice/index'
import { parseLyric } from '@/utils/format'
import type { IRootState } from '@/store/index'

interface IThunkState {
  state: IRootState
}
//获取歌曲
export const fetchCurrentSong = createAsyncThunk<void, number, IThunkState>(
  'currentsong',
  (id: number, { dispatch, getState }) => {
    getSongLyric(id).then((res) => {
      //console.log(parseLyric(res.lrc.lyric))
      dispatch(ActionToSongLyric(parseLyric(res.lrc.lyric)))
      // console.log(res.lrc)
    })

    const playSongList = getState().player.playSongList
    //判断播放歌曲列表中有无当前播放音乐
    const findIndex = playSongList.findIndex((item: any) => item.id === id)
    if (findIndex === -1) {
      //没有相同歌曲
      getCurrentSong(id).then((res) => {
        if (!res.songs.length) return
        dispatch(ActionToCurrentSong(res.songs[0]))
        //console.log(res.songs)
        const newPlayList = [...playSongList]
        newPlayList.push(res.songs[0])
        dispatch(ActionToPlaySongList(newPlayList))
        //记录被添加至列表的歌曲索引
        dispatch(ActionToPlaySongListIndex(newPlayList.length - 1))
      })
    } else {
      //有相同歌曲
      const song = playSongList[findIndex]
      dispatch(ActionToPlaySongList(song))
      dispatch(ActionToPlaySongListIndex(findIndex))
    }
  }
)

//在列表中切换歌曲
export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changeMusic',
  (isNext, { dispatch, getState }) => {
    //获取state中的数据
    const player = getState().player
    const playMode = player.playMode
    const songIndex = player.playSongListIndex
    const songList = player.playSongList
    //根据不同的切换模式计算下一首歌曲的索引
    let newIndex = songIndex
    //单曲循环
    if (playMode === 1) {
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      //顺序播放或者随机播放
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      //判断索引值是否越界
      if (newIndex > songList.length - 1) newIndex = 0
      if (newIndex < 0) newIndex = songList.length - 1
    }
    //获取新歌曲
    const song = songList[newIndex]
    dispatch(ActionToCurrentSong(song))
    dispatch(ActionToPlaySongListIndex(newIndex))

    //获取新歌词
    getSongLyric(song.id).then((res) => {
      //console.log(parseLyric(res.lrc.lyric))
      dispatch(ActionToSongLyric(parseLyric(res.lrc.lyric)))
      // console.log(res.lrc)
    })
  }
)
//获取歌词
export const fetchSongLyric = createAsyncThunk(
  'currentsong',
  (id: number, { dispatch }) => {
    getSongLyric(id).then((res) => {
      //console.log(parseLyric(res.lrc.lyric))
      dispatch(ActionToSongLyric(parseLyric(res.lrc.lyric)))
      // console.log(res.lrc)
    })
  }
)

interface IPlayerState {
  currentSong: any
  songlyric: any
  lyricIndex: number
  playSongList: any
  playSongListIndex: number
  playMode: number //0:顺序  1：随机  2：单曲循环
}

const initialState: IPlayerState = {
  currentSong: {},
  songlyric: [],
  lyricIndex: -1,
  playSongList: [],
  playSongListIndex: -1,
  playMode: 0
}

const currentSongSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    ActionToCurrentSong: (state, { payload }) => {
      state.currentSong = payload
    },
    ActionToSongLyric: (state, { payload }) => {
      state.songlyric = payload
    },
    ActionToLyric: (state, { payload }) => {
      state.lyricIndex = payload
    },
    ActionToPlaySongList: (state, { payload }) => {
      state.playSongList = payload
    },
    ActionToPlaySongListIndex: (state, { payload }) => {
      state.playSongListIndex = payload
    },
    ActionToPlayMode: (state, { payload }) => {
      state.playMode = payload
    }
  }
})

export const {
  ActionToCurrentSong,
  ActionToSongLyric,
  ActionToLyric,
  ActionToPlaySongList,
  ActionToPlaySongListIndex,
  ActionToPlayMode
} = currentSongSlice.actions

export default currentSongSlice.reducer
