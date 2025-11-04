import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";
import { mockApi, isGitHubPages } from "../../lib/mockApi";

export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  if (isGitHubPages()) {
    return await mockApi.getCategories();
  }
  return api.get("/api/categories");
});

const slice = createSlice({
  name: "categories",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCategories.pending, (s) => { s.status = "loading" })
     .addCase(fetchCategories.fulfilled, (s, a) => { s.status = "succeeded"; s.items = a.payload })
     .addCase(fetchCategories.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message });
  }
});

export default slice.reducer;
