import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../features/questions/questionsSlice";

export default function NewQuestion() {
  const [categoryId, setCategoryId] = useState("");
  const [body, setBody] = useState("");
  const categories = useSelector((s) => s.categories.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!body.trim().endsWith("?")) return alert("Question must end with a question mark.");
    try {
      await dispatch(createQuestion({ categoryId, body })).unwrap();
      navigate(`/category/${categoryId}`);
    } catch (err) { alert("Failed: " + JSON.stringify(err)); }
  };

  return (
    <div>
      <h2>New Question</h2>
      <form onSubmit={submit}>
        <div>
          <label>Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">Select</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label>Question</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} />
        </div>
        <button type="submit">Post Question</button>
      </form>
    </div>
  );
}
