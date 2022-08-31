import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCurrentUser } from '../../api/admin'

/**
 * 用户状态
 */
export interface UserState {
  loading: boolean
  user: User
  permissionList: Permission[]
}

/**
 * 初始状态
 */
const initialState: UserState = {
  loading: true,
  user: { id: 0, username: '', email: '' },
  permissionList: [],
}

/**
 * 导出State
 */
export const userState = createSlice({
  name: 'userState',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getCurrentUserInfo.fulfilled,
      (state, action: PayloadAction<{ admin: User; permissionList: Permission[] }>) => {
        state.loading = false
        state.user = action.payload.admin
        state.permissionList = action.payload.permissionList
      }
    )
  },
})

export const getCurrentUserInfo = createAsyncThunk<{ admin: User; permissionList: Permission[] }>(
  'getCurrentUserInfo',
  async () => {
    const current = await getCurrentUser()
    return { ...current.data }
  }
)

/**
 * 导出Reducer
 */
export default userState.reducer
