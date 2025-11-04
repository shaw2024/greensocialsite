import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

const initialState = {
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("auth/login", async ({ username, password }) => {
  const res = await api.post("/api/auth/login", { username, password });
  return res;
});

export const register = createAsyncThunk("auth/register", async ({ username, password }) => {
  const res = await api.post("/api/auth/register", { username, password });
  return res;
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.status = "loading" })
      .addCase(login.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.token = a.payload.token;
        s.username = a.payload.username;
        localStorage.setItem("token", a.payload.token);
        localStorage.setItem("username", a.payload.username);
      })
      .addCase(login.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message })
      .addCase(register.pending, (s) => { s.status = "loading" })
      .addCase(register.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.token = a.payload.token;
        s.username = a.payload.username;
        localStorage.setItem("token", a.payload.token);
        localStorage.setItem("username", a.payload.username);
      })
      .addCase(register.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message });
  }
});

export const { logout } = slice.actions;

// Selectors
export const selectIsAuthenticated = (state) => !!state.auth.token;

export default slice.reducer;
