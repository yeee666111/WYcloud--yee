import { memo } from 'react'
import type { ReactNode } from 'react'
import { RankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useAppSelector } from '@/store'
import TopRankingItem from '../top-ranking-item/index'
import { shallowEqual } from 'react-redux'

interface Iprops {
  children?: ReactNode
}

const TopRanking: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const { ranking = [] } = useAppSelector(
    (state) => ({
      ranking: state.recommend.ranking
    }),
    shallowEqual
  )
  return (
    <RankingWrapper>
      <AreaHeaderV1
        title="排行榜"
        moreLink="/discover/leaderboard"
        moreText="更多"
      />
      <div className="content">
        {ranking.map((item) => {
          return (
            <TopRankingItem key={item.id} itemData={item}>
              {item.name}
            </TopRankingItem>
          )
        })}
      </div>
    </RankingWrapper>
  )
}

export default memo(TopRanking)
