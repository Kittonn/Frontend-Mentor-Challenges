import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {split_data} from '../function'
let url =
  "https://raw.githubusercontent.com/Kittonn/Frontend-Mentor-Challenges/master/readme_data.md";
export const getData = createAsyncThunk("/api", async () => {
  return await fetch(url)
    .then((res) => res.text())
    .then((data) => split_data(data));
});

interface projectI {
    id:number
    name:string
    path:string
    stack:string[]
}

interface dataI {
  data: projectI[];
  status: string;
}

const initialState: dataI = {
  data: [],
  status: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(getData.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builders.addCase(getData.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default dataSlice;