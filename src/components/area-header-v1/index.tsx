import { memo } from 'react'
import type { ReactNode } from 'react'
import { HeaderV1Wrapper } from './style'
import { Link } from 'react-router-dom'
interface Iprops {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moreLink?: string
  moreText?: string
}

const AreaHeaderV1: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const {
    title = '默认标题',
    keywords = [],
    moreLink = '/',
    moreText = '更多'
  } = props
  return (
    <HeaderV1Wrapper className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link className="more" to={moreLink}>
          {moreText}
        </Link>
        <i className="sprite_02 icon "></i>
      </div>
    </HeaderV1Wrapper>
  )
}

export default memo(AreaHeaderV1)
