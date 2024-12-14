//最顶上组件

import { memo } from 'react'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'
import headerTitles from '@/assets/data/header_titles.json'
interface Iprops {
  children?: ReactNode
}

const AppHeader: React.FunctionComponent<Iprops> = (props: Iprops) => {
  //组件的展示逻辑
  const showItem = (item: any) => {
    if (item.type === 'path') {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return (
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.title}
        </a>
      )
    }
  }

  return (
    <>
      <HeaderWrapper>
        <div className="content wrap-v1">
          <HeaderLeft>
            <a className=" logo sprite_01" href="/">
              网易云音乐
            </a>
            <div className="title-list">
              {headerTitles.map((item, index) => {
                return (
                  <div className="item" key={item.link}>
                    {showItem(item)}
                  </div>
                )
              })}
            </div>
          </HeaderLeft>
          <HeaderRight>
            <Input
              size="large"
              placeholder="音乐/视频/电台/用户"
              className="search"
              prefix={<SearchOutlined />}
            />
            <div className="center">创作者中心</div>
            <div className="login">登录</div>
          </HeaderRight>
        </div>
        <div className="divider"></div>
      </HeaderWrapper>
    </>
  )
}

export default memo(AppHeader)
