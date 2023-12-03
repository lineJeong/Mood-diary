import { useRef, useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App.js";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import MoodItem from "./MoodItem";

import { getStringDate } from "../util/date.js";
import { moodList } from "../util/mood.js";

function DiaryEditor({ isEdit, originData }) {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [mood, setMood] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const handleClickMood = useCallback((mood) => {
    setMood(mood);
  }, []);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit
          ? "Are you sure you want to modify your diary?"
          : "Do you want to write a new diary?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, mood);
      } else {
        onEdit(originData.id, date, content, mood);
      }
    }
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("Are you sure you want to remove your diary?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setMood(originData.mood);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "Edit a diary" : "Create a new diary"}
        leftChild={<MyButton text={"< Back"} onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <MyButton
              text={"Remove"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>When was it today?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>Today's mood</h4>
          <div className="input_box mood_list_wrapper">
            {moodList.map((it) => (
              <MoodItem
                key={it.mood_id}
                {...it}
                onClick={handleClickMood}
                isSelected={it.mood_id === mood}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>Today's diary</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="How was your day today?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"Cancel"} onClick={() => navigate(-1)} />
            <MyButton
              text={isEdit ? "Edit" : "Create"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
