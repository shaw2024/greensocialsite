import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import questionsReducer from "../features/questions/questionsSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		categories: categoriesReducer,
		questions: questionsReducer,
	}
});

export default store;
