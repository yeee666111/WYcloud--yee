import { memo } from 'react'
import type { ReactNode } from 'react'
import { HotRecommendWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1/index'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import SongMenuItem from '@/components/song-menu-item'
interface Iprops {
  children?: ReactNode
}

const HotRecommend: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const { hotRecommends } = useAppSelector(
    (state) => ({
      hotRecommends: state.recommend.hotRecommends
    }),
    shallowEqual
  )
  //console.log(hotRecommends.slice(0, 8))

  return (
    <HotRecommendWrapper>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['yzt', 'bbb']}
        moreText="更多"
        moreLink="/discover/singer"
      />

      <div className="recommend-list">
        {hotRecommends.slice(0, 8).map((item) => {
          return <SongMenuItem key={item.id} itemData={item} />
        })}
      </div>
    </HotRecommendWrapper>
  )
}

export default memo(HotRecommend)
