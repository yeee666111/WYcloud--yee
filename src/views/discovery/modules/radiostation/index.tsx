import { memo } from 'react'
import type { ReactNode } from 'react'

interface Iprops {
  children?: ReactNode
}

const Radiostation: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <div>Radiostation</div>
}

export default memo(Radiostation)
