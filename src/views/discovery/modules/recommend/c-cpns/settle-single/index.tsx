import { memo } from 'react'
import type { ReactNode } from 'react'
import { SettleSingleWrapper } from './style'
import AreaHeaderV2 from '@/components/area-header-v2/index'
import { useAppSelector } from '@/store'
import { formatImgUrl } from '@/utils/format'
import { shallowEqual } from 'react-redux'

interface Iprops {
  children?: ReactNode
}

const SettleSingle: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const { settleSingers = [] } = useAppSelector(
    (state) => ({
      settleSingers: state.recommend.settleSingers
    }),
    shallowEqual
  )
  return (
    <SettleSingleWrapper>
      <AreaHeaderV2
        title="入住歌手"
        moreLink="#/discover/artist"
        moreText="查看全部&gt;"
      />
      <div className="artists">
        {settleSingers?.map((item) => {
          return (
            <a href="#/discover/artist" className="item" key={item.id}>
              <img src={formatImgUrl(item.picUrl, 62)} alt=""></img>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alia">{item.alias.join('')}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="#/discover/artist">申请成为网易音乐人</a>
      </div>
    </SettleSingleWrapper>
  )
}

export default memo(SettleSingle)
