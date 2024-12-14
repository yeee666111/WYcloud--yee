import { memo } from 'react'
import type { ReactNode } from 'react'

interface Iprops {
  children?: ReactNode
}

const Singer: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <div>Singer</div>
}

export default memo(Singer)
