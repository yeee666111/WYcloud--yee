import { memo } from 'react'
import type { ReactNode } from 'react'

interface Iprops {
  children?: ReactNode
}

const Leaderboard: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <div>Leaderboard</div>
}

export default memo(Leaderboard)
