import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

function DiaryItem({ id, mood, content, date }) {
  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div key={id} className="DiaryItem">
      <div
        onClick={goDetail}
        className={["mood_img_wrapper", `mood_img_wrapper_${mood}`].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/mood${mood}.png`}
          alt={`mood${mood}`}
        />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"Edit"} />
      </div>
    </div>
  );
}

export default DiaryItem;
