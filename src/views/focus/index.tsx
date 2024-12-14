import { memo } from 'react'
import type { ReactNode } from 'react'

interface Iprops {
  children?: ReactNode
}

const Focus: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <div>Focus</div>
}

export default memo(Focus)
