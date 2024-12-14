import { memo } from 'react'
import type { ReactNode } from 'react'
import { TopRankingItemWrapper } from './style'
import { formatImgUrl } from '@/utils/format'
import { useAppDispatch } from '@/store'
import { fetchCurrentSong } from '@/views/player/store-song'

interface Iprops {
  children?: ReactNode
  itemData: any
}

const TopRankingItem: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const { itemData = {} } = props
  const { tracks = [] } = itemData
  const dispatch = useAppDispatch()
  //添加播放歌曲
  function handlePlayClick(id: number) {
    dispatch(fetchCurrentSong(id))
  }
  return (
    <TopRankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={formatImgUrl(itemData.coverImgUrl, 80)} alt="" />
          <a className="sprite_cover" href="/">
            系统要求
          </a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="list-item" key={item.id}>
              <div className="rank">{index + 1}</div>
              <div className="info">
                <span className="name text-nowrap">{item.name}</span>
                <div className="operate">
                  <button
                    className="btn sprite_02 play"
                    onClick={() => handlePlayClick(item.id)}
                  ></button>
                  <button className="btn sprite_icon2 addto"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="/discover/ranking">查看全部 &gt;</a>
      </div>
    </TopRankingItemWrapper>
  )
}

export default memo(TopRankingItem)
