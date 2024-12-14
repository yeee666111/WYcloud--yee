import hyRequest from '@/service'

//获取播放歌曲
export const getCurrentSong = (ids: number) => {
  return hyRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

//获取歌词数据
export const getSongLyric = (id: number) => {
  return hyRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}
