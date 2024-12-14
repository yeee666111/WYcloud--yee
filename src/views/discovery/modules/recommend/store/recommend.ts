import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getBanners,
  getHotRecommend,
  getNewDisc,
  getPlaylistDetail,
  getArtistList
} from '../service/recommend'
interface IinitialRecommendState {
  banners: any[]
  hotRecommends: any[]
  newDisc: any[]
  ranking: any[]
  settleSingers: any[]
}

const initialState: IinitialRecommendState = {
  banners: [],
  hotRecommends: [],
  newDisc: [],
  ranking: [],
  settleSingers: []
}

//对发送异步请求进行封装
export const fetchRecommendData = createAsyncThunk(
  'fetchData',
  (_, { dispatch }) => {
    getBanners().then((res) => {
      dispatch(ActionToBanner(res.banners))
    })
    getHotRecommend().then((res) => {
      dispatch(ActionToHotRecommend(res.result))
    })
    getNewDisc(8).then((res) => {
      dispatch(ActionToNewDisc(res.albums))
    })
    getArtistList(5).then((res) => {
      dispatch(ActionToSettleSingers(res.artists))
    })
  }
)

//获取排行榜数据
export const fetchPlaylistDetail = createAsyncThunk(
  'ranking',
  (_, { dispatch }) => {
    const rankingsIds = [19723756, 3779629, 2884035]
    const promiseRanking: Promise<any>[] = []
    for (const id of rankingsIds) {
      promiseRanking.push(getPlaylistDetail(id))
    }
    Promise.all(promiseRanking).then((res) => {
      //console.log(res)
      const ranking = res
        .filter((item) => item.playlist)
        .map((item) => item.playlist)
      dispatch(ActionToRankingList(ranking))
    })
  }
)
//获取轮播图
// export const fetchBannerList = createAsyncThunk(
//   'banners',
//   async (args, { dispatch }) => {
//     const res = await getBanners()
//     //console.log(res.banners)
//     //return res.banners
//     dispatch(ActionToBanner(res.banners))
//   }
// )
// //获取热门推荐
// export const fetchHotRecommendLit = createAsyncThunk(
//   'hotRecommend',
//   async (args, { dispatch }) => {
//     const res = await getHotRecommend()
//     dispatch(ActionToHotRecommend(res.result))
//   }
// )
// //获取新碟上架数据
// export const fetchNewDisc = createAsyncThunk(
//   'newDisc',
//   async (args, { dispatch }) => {
//     const res = await getNewDisc(8)
//     //console.log(res)
//     dispatch(ActionToNewDisc(res.albums))
//   }
// )
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    ActionToBanner: (state, { payload }) => {
      state.banners = payload
    },
    ActionToHotRecommend: (state, { payload }) => {
      state.hotRecommends = payload
    },
    ActionToNewDisc: (state, { payload }) => {
      state.newDisc = payload
    },
    ActionToRankingList: (state, { payload }) => {
      state.ranking = payload
    },
    ActionToSettleSingers: (state, { payload }) => {
      state.settleSingers = payload
    }
  }
})

export default recommendSlice.reducer
export const {
  ActionToBanner,
  ActionToHotRecommend,
  ActionToNewDisc,
  ActionToRankingList,
  ActionToSettleSingers
} = recommendSlice.actions
