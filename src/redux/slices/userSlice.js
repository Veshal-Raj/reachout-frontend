import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: { id: null, email: null, name: null },
    userVerified: false,
    loading: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
        state.user = action.payload;
    },
    setUserVerified(state, action) {
        state.userVerified = action.payload;
    },
    setLoading(state, action) {
        state.loading = action.payload;
    },
    resetUserState(state) {
        state.user = { id: null, email: null, name: null };
        state.userVerified = false;
        state.loading = true;
    },
  },
})

export const { setUser, setUserVerified, setLoading, resetUserState } = userSlice.actions

export default userSlice.reducer