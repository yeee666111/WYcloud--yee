//对hot-recommend中的播放量数据进行格式化
export function formatCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}

//对服务器返回数据图片进行优化处理
export function formatImgUrl(
  imgUrl: string,
  width: number,
  height: number = width
) {
  const picUrl = imgUrl + `?param=${width}y${height}`
  return picUrl
}

//获取歌曲
export function getPlayerUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

//对音乐时间进行格式化
export function formatDuration(time: number) {
  const timeSecond = time / 1000 //毫秒转化为妙
  const minute = Math.floor(timeSecond / 60)
  const second = Math.floor(timeSecond) % 60

  //再格式化时间 补0
  const formatMinute = String(minute).padStart(2, '0')
  const formatSecond = String(second).padStart(2, '0')

  return `${formatMinute}:${formatSecond}`
}

//解析歌词为数组
interface ILyric {
  time: number
  text: string
}

export function parseLyric(lyricString: string) {
  //对时间进行正则判断
  const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

  //lyrics为最后完成的数组
  const lyrics: ILyric[] = []
  const lines: string[] = lyricString.split('\n')
  for (const line of lines) {
    const result = timeRegExp.exec(line)
    if (!result) continue
    //console.log(result)
    //获取时间
    const time1 = Number(result[1]) * 60 * 1000
    const time2 = Number(result[2]) * 1000
    const time3 =
      result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10
    const time = time1 + time2 + time3
    //console.log(time)
    //获取歌词
    const text = line.replace(timeRegExp, '')
    //console.log(text)
    lyrics.push({ time, text })
  }
  return lyrics
}
