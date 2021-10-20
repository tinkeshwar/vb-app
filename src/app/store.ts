import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import VBReducer from '../store'

export const store = configureStore({
  reducer: {
    vb: VBReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;