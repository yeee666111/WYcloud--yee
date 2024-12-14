import { memo, useRef } from 'react'
import type { ReactNode, ElementRef } from 'react'
import { NewDiscWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1/index'
import { Carousel } from 'antd'
import { shallowEqualApp, useAppSelector } from '@/store'
import NewDiscItem from '@/components/new-disc-item'

interface Iprops {
  children?: ReactNode
}

const NewDisc: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const albumRef = useRef<ElementRef<typeof Carousel>>(null)
  const { newDisc } = useAppSelector(
    (state) => ({
      newDisc: state.recommend.newDisc
    }),
    shallowEqualApp
  )
  //console.log(newDisc)

  return (
    <NewDiscWrapper>
      <AreaHeaderV1
        title="新碟推荐"
        moreText="更多"
        moreLink="/discover/newdisc"
      />
      <div className="content">
        <button
          className="arrow arrow-left sprite_02"
          onClick={() => albumRef.current?.prev()}
        ></button>
        <div className="banner">
          <Carousel ref={albumRef} speed={1500}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newDisc.slice(item * 5, (item + 1) * 5).map((disc) => {
                      return <NewDiscItem key={disc.id} itemData={disc} />
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={() => albumRef.current?.next()}
        ></button>
      </div>
    </NewDiscWrapper>
  )
}

export default memo(NewDisc)
