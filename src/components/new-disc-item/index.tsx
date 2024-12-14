import { memo } from 'react'
import type { ReactNode } from 'react'
import { NewDiscWrapper } from './style'
import { formatImgUrl } from '@/utils/format'
interface Iprops {
  children?: ReactNode
  itemData: any
}

const NewDiscItem: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const { itemData } = props
  return (
    <NewDiscWrapper>
      <div className="top">
        <img src={formatImgUrl(itemData.picUrl, 100)} alt="/" />
        <a href="/" className="cover sprite_cover">
          {itemData.name}
        </a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </NewDiscWrapper>
  )
}

export default memo(NewDiscItem)
