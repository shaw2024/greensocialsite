import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

export const fetchQuestionsByCategory = createAsyncThunk(
  "questions/fetchByCategory",
  async (categoryId) => api.get(`/api/questions/category/${categoryId}`)
);

export const createQuestion = createAsyncThunk(
  "questions/create",
  async ({ categoryId, body }) => api.post(`/api/questions`, { categoryId, body })
);

export const fetchQuestion = createAsyncThunk(
  "questions/fetchOne",
  async (id) => api.get(`/api/questions/${id}`)
);

export const postAnswer = createAsyncThunk(
  "questions/postAnswer",
  async ({ id, body }) => api.post(`/api/questions/${id}/answers`, { body })
);

const slice = createSlice({
  name: "questions",
  initialState: { byCategory: {}, current: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchQuestionsByCategory.pending, (s) => { s.status = "loading" })
     .addCase(fetchQuestionsByCategory.fulfilled, (s, a) => { s.status = "succeeded"; s.byCategory[a.meta.arg] = a.payload })
     .addCase(fetchQuestionsByCategory.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message })

     .addCase(createQuestion.fulfilled, (s, a) => {
       const cat = a.payload.categoryId;
       s.byCategory[cat] = s.byCategory[cat] ? [a.payload, ...s.byCategory[cat]] : [a.payload];
     })

     .addCase(fetchQuestion.fulfilled, (s, a) => { s.current = a.payload })
     .addCase(postAnswer.fulfilled, (s, a) => { s.current = a.payload });
  }
});

export default slice.reducer;
