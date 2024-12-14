import { memo } from 'react'
import type { ReactNode } from 'react'

interface Iprops {
  name: string
  age: number
  height?: number
  children?: ReactNode //ReactNode基本涵盖很多类型
}

const Discovery: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <div>discovery</div>
}

export default memo(Discovery)
