import { memo } from 'react'
import type { ReactNode } from 'react'
import { AreaHeaderV2Wrapper } from './style'

interface Iprops {
  children?: ReactNode
  title?: string
  moreText?: string
  moreLink?: string
}

const AreaHeaderV2: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const { title = '默认主题', moreLink, moreText } = props
  return (
    <AreaHeaderV2Wrapper>
      <h3 className="title">{title} </h3>
      {moreLink && moreText && <a href={moreLink}>{moreText}</a>}
    </AreaHeaderV2Wrapper>
  )
}

export default memo(AreaHeaderV2)
