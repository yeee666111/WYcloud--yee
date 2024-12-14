import { memo } from 'react'
import type { ReactNode } from 'react'

interface Iprops {
  children?: ReactNode
}

const AppFooter: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <div>AppFooter</div>
}

export default memo(AppFooter)
