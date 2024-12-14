import { memo } from 'react'
import type { ReactNode } from 'react'

interface Iprops {
  children?: ReactNode
}

const Songlist: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <div>Songlist</div>
}

export default memo(Songlist)
