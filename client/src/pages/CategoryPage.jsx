import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsByCategory } from "../features/questions/questionsSlice";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const questions = useSelector((s) => s.questions.byCategory[categoryId] || []);

  useEffect(() => { dispatch(fetchQuestionsByCategory(categoryId)); }, [dispatch, categoryId]);

  return (
    <div>
      <h2>Questions</h2>
      <div>
        <Link to="/new">Post a new question</Link>
      </div>
      <ul>
        {questions.map(q => (
          <li key={q._id}><Link to={`/questions/${q._id}`}>{q.body}</Link> — <small>by {q.author}</small></li>
        ))}
      </ul>
    </div>
  );
}
