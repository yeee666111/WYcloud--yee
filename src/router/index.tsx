import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
// import discover from '@/views/discover'
// import Mine from '@/views/mine'
// import Focus from '@/views/focus'
// import Download from '@/views/download'

//路由的懒加载  便于打包路由时进行分包处理
const Discover = lazy(() => import('@/views/discovery'))
const Mine = lazy(() => import('@/views/mine'))
const Focus = lazy(() => import('@/views/focus'))
const Download = lazy(() => import('@/views/download'))
//引入discover下的二级路由
const Leaderboard = lazy(() => import('@/views/discovery/modules/leaderboard'))
const Newdisc = lazy(() => import('@/views/discovery/modules/newdisc'))
const Radiostation = lazy(
  () => import('@/views/discovery/modules/radiostation')
)
const Recommend = lazy(() => import('@/views/discovery/modules/recommend'))
const Singer = lazy(() => import('@/views/discovery/modules/singer'))
const Songlist = lazy(() => import('@/views/discovery/modules/songlist'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover"></Navigate>
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend"></Navigate>
      },
      {
        path: '/discover/leaderboard',
        element: <Leaderboard></Leaderboard>
      },
      {
        path: '/discover/newdisc',
        element: <Newdisc></Newdisc>
      },
      {
        path: '/discover/radiostation',
        element: <Radiostation></Radiostation>
      },
      {
        path: '/discover/recommend',
        element: <Recommend></Recommend>
      },
      {
        path: '/discover/singer',
        element: <Singer></Singer>
      },
      {
        path: '/discover/songlist',
        element: <Songlist></Songlist>
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine></Mine>
  },
  {
    path: '/focus',
    element: <Focus></Focus>
  },
  {
    path: '/download',
    element: <Download></Download>
  }
]

export default routes
