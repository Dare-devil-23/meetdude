'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum Role {
  Admin = 'Admin',
  User = 'User'
}

interface Avatar {
  id: string;
  imageUrl?: string | null;
  name?: string | null;
}

interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  avatarId: string | null;
  role: Role | null;
  avatar: Avatar | null;
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  avatarId: null,
  role: null,
  avatar: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{
      id: string;
      username: string;
      email: string;
      avatarId?: string;
      role: Role;
      avatar?: Avatar;
    }>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatarId = action.payload.avatarId || null;
      state.role = action.payload.role;
      state.avatar = action.payload.avatar || null;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.avatarId = null;
      state.role = null;
      state.avatar = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer; 