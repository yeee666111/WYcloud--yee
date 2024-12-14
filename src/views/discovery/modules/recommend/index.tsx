import { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import React from 'react'
import {
  fetchRecommendData,
  fetchPlaylistDetail
  // fetchBannerList,
  // fetchHotRecommendLit,
  // fetchNewDisc
} from './store/recommend'
import { useAppDispatch } from '@/store'
import Topbanner from './c-cpns/top-banner'
import { RecommendWrapper } from './style'
import HotRecommend from './c-cpns/hot-recommend'
import NewDisc from './c-cpns/newdics-recommend'
import TopRanking from './c-cpns/top-ranking'
import UserLogin from './c-cpns/user-login/index'
import SettleSingle from './c-cpns/settle-single/index'
import HotAnchor from '@/views/discovery/modules/recommend/c-cpns/hot-anchor'

interface Iprops {
  children?: ReactNode
}

const Recommend: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRecommendData())
    dispatch(fetchPlaylistDetail())
    // dispatch(fetchBannerList())
    // dispatch(fetchHotRecommendLit())
    // dispatch(fetchNewDisc())
  }, [dispatch])

  return (
    <>
      <RecommendWrapper>
        <Topbanner />
        <div className="content wrap-v2">
          <div className="left">
            <HotRecommend />
            <NewDisc />
            <TopRanking />
          </div>
          <div className="right">
            <UserLogin />
            <SettleSingle />
            <HotAnchor />
          </div>
        </div>
      </RecommendWrapper>
    </>
  )
}

export default memo(Recommend)
