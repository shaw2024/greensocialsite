import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestion, postAnswer } from "../features/questions/questionsSlice";
import Modal from "../components/Modal";

export default function QuestionView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const question = useSelector((s) => s.questions.current);
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => { dispatch(fetchQuestion(id)); }, [dispatch, id]);

  const submitAnswer = async () => {
    if (!answer.trim()) return alert("Answer cannot be empty");
    try {
      await dispatch(postAnswer({ id, body: answer })).unwrap();
      setAnswer("");
      setOpen(false);
    } catch (err) { alert(JSON.stringify(err)); }
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div>
      <h2>{question.body}</h2>
      <p>by {question.author}</p>
      <h3>Answers</h3>
      <ul>
        {question.answers.map((a, i) => <li key={i}><strong>{a.author}:</strong> {a.body}</li>)}
      </ul>
      <button onClick={() => setOpen(true)}>Add Answer</button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3>New Answer</h3>
        <textarea rows={4} value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <div style={{ marginTop: 8 }}>
          <button onClick={submitAnswer}>Post Answer</button>
          <button onClick={() => setOpen(false)} style={{ marginLeft: 8 }}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
