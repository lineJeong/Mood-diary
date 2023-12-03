import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStaticContext } from "../App";
import { getStringDate } from "../util/date";
import { moodList } from "../util/mood";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

function Diary() {
  const diaryList = useContext(DiaryStaticContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Mood diary - No.${id}`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("There is no diary.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">Loading...</div>;
  } else {
    const curMoodData = moodList.find(
      (it) => parseInt(it.mood_id) === parseInt(data.mood)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`Record of ${getStringDate(new Date(data.date))}`}
          leftChild={<MyButton text={"< Back"} onClick={() => navigate(-1)} />}
          rightChild={
            <MyButton
              text={"Edit"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>Today's mood</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.mood}`,
              ].join(" ")}
            >
              <img src={curMoodData.mood_img} alt="mood_image" />
              <div className="mood_descript">{curMoodData.mood_descript}</div>
            </div>
          </section>
          <section>
            <h4>Today's diary</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default Diary;
