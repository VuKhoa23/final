import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfo = {
  username: string;
  userId: number;
};

type UserInfoState = {
  userInfo: UserInfo | null;
};

const initialState: UserInfoState = {
  userInfo: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
