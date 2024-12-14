import { memo, useRef, useState } from 'react'
import type { ReactNode, ElementRef } from 'react'
import { BannerLeft, BannerWrapper, BannerRight, BannerControl } from './styled'
import { shallowEqualApp, useAppSelector } from '@/store'
import { Carousel } from 'antd'
import classNames from 'classnames'
interface Iprops {
  children?: ReactNode
}

const Topbanner: React.FunctionComponent<Iprops> = (props: Iprops) => {
  //对背景面板的处理
  const [currentIndex, setCurrentIndex] = useState(0)
  //获取轮播图左右切换
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  //获取轮播图数据
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqualApp
  )

  //对轮播图的各种处理
  function handleAfterChange(current: number) {
    //console.log(current)
    setCurrentIndex(current)
  }
  function handlePrevClick() {
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    bannerRef.current?.next()
  }
  //点击切换轮播图显示效果
  function handleChangeCarousel(index: number) {
    bannerRef.current?.goTo(index)
  }

  //获取当前轮播图图片
  let bigImgUrl = banners[currentIndex]?.imageUrl
  if (bigImgUrl) {
    bigImgUrl = bigImgUrl + '?imageView&blur=40x20'
  }
  return (
    <>
      <BannerWrapper
        style={{ background: `url(${bigImgUrl}) center center / 6000px` }}
      >
        <div className="banner wrap-v2">
          <BannerLeft>
            <Carousel
              autoplay
              dots={false}
              ref={bannerRef}
              effect="fade"
              afterChange={handleAfterChange}
            >
              {banners.map((item) => {
                return (
                  <div className="banner-item" key={item.imageUrl}>
                    <img
                      className="image"
                      alt={item.typeTitle}
                      src={item.imageUrl}
                    ></img>
                  </div>
                )
              })}
            </Carousel>
            <ul className="dots">
              {banners.map((item, index) => {
                return (
                  <li
                    key={item.imageUrl}
                    onClick={() => handleChangeCarousel(index)}
                  >
                    <span
                      className={classNames('item', {
                        active: index === currentIndex
                      })}
                    ></span>
                  </li>
                )
              })}
            </ul>
          </BannerLeft>
          <BannerRight></BannerRight>
          <BannerControl>
            <button className="btn left" onClick={handlePrevClick}></button>
            <button className="btn right" onClick={handleNextClick}></button>
          </BannerControl>
        </div>
      </BannerWrapper>
    </>
  )
}

export default memo(Topbanner)
