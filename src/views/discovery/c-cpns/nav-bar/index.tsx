import { memo } from 'react'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { discoverMenu } from '@/assets/data/local-data'
import { NavWrapper } from './style'
interface Iprops {
  children?: ReactNode
}

const NavBar: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return (
    <NavWrapper>
      <div className="nav wrap-v1">
        {discoverMenu.map((item) => {
          return (
            <div className="item" key={item.link}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          )
        })}
      </div>
    </NavWrapper>
  )
}

export default memo(NavBar)
