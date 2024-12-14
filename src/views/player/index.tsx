import { memo } from 'react'
import type { ReactNode } from 'react'

interface Iprops {
  children?: ReactNode
}

const Player: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <div>Player</div>
}

export default memo(Player)
