import { Suspense } from 'react'
import React from 'react'
import routes from './router/index'
import { useRoutes } from 'react-router-dom'
import AppHeader from './components/app-Header'
import AppFooter from './components/app-Footer'
import PlayerBar from './views/player/player-bar/index'
// import { fetchCurrentSong, fetchSongLyric } from './views/player/store-song'
// import { useAppDispatch } from './store'
function App() {
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchCurrentSong(2615702892))
  //   dispatch(fetchSongLyric(2615702892))
  // }, [dispatch])
  return (
    <>
      <AppHeader />
      <Suspense fallback="loading">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      {/* 页面播放器 */}
      <PlayerBar />
      <AppFooter />
    </>
  )
}

export default App
