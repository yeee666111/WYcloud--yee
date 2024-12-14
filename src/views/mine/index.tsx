import { memo } from 'react'
import type { ReactNode } from 'react'

interface Iprops {
  children?: ReactNode
}

const Mine: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <div>Mine</div>
}

export default memo(Mine)
