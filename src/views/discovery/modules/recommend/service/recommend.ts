import hyRequest from '@/service'

//获取轮播图数据
export const getBanners = () => {
  return hyRequest.get({
    url: '/banner'
  })
}
//获取热门推荐数据
export const getHotRecommend = () => {
  return hyRequest.get({
    url: '/personalized'
  })
}
//获取新碟推荐的数据
export const getNewDisc = (limit: number) => {
  return hyRequest.get({
    url: '/album/newest',
    params: {
      limit: limit
    }
  })
}
//获取排行榜数据
export const getPlaylistDetail = (id: number) => {
  return hyRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
//获取入住歌手页表
export const getArtistList = (limit = 30) => {
  return hyRequest.get({
    url: '/artist/list',
    params: {
      limit
    }
  })
}
