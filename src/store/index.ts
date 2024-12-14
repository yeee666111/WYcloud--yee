import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'
import playerReducer from '@/views/player/store-song/index'
import recommendReducer from '@/views/discovery/modules/recommend/store/recommend'
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual
} from 'react-redux'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer,
    player: playerReducer
  }
})

type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
type DispatchType = typeof store.dispatch

//useSelector的hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
//useDispatch的hook
export const useAppDispatch: () => DispatchType = useDispatch
//定义app中的shallowEqual
export const shallowEqualApp = shallowEqual
export default store
