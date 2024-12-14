import { memo } from 'react'
import type { ReactNode } from 'react'

interface Iprops {
  children?: ReactNode
}

const Newdisc: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <div>Newdisc</div>
}

export default memo(Newdisc)
