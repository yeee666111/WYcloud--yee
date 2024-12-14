import { memo } from 'react'
import type { ReactNode } from 'react'

interface Iprops {
  children?: ReactNode
}

const Download: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <div>Download</div>
}

export default memo(Download)
