import { createSlice } from '@reduxjs/toolkit'

interface IinitialState {
  count: number
  message: string
  height: number
  direction: 'left' | 'right'
}

const initialState: IinitialState = {
  count: 100,
  message: 'hello redux',
  height: 100,
  direction: 'left'
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeMessage(state, { payload }) {
      state.message = payload
    }
  }
})

export default counterSlice.reducer
export const { changeMessage } = counterSlice.actions
