

// src/store/slices/userSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';


interface UserState {
  selectedCategory: string | null;
  searchQuery: string;
}

const initialState: UserState = {
  selectedCategory: null,
  searchQuery: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSelectedCategory, setSearchQuery } = userSlice.actions;
export default userSlice.reducer;