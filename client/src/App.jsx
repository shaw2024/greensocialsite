import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import NewQuestion from "./pages/NewQuestion";
import QuestionView from "./pages/QuestionView";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/category/:categoryId" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
        <Route path="/new" element={<ProtectedRoute><NewQuestion /></ProtectedRoute>} />
        <Route path="/questions/:id" element={<ProtectedRoute><QuestionView /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
