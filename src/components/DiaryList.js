import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  {
    value: "Latest",
  },
  {
    value: "Oldest",
  },
];

const filterOptionList = [
  { value: "All" },
  { value: "Good" },
  { value: "Bad" },
];

function ControlMenu({ value, onChange, optionList }) {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.value}
        </option>
      ))}
    </select>
  );
}

function DiaryList({ diaryList }) {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("Latest");
  const [filter, setFilter] = useState("All");

  const getProcessDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "Good") {
        return parseInt(item.mood) <= 3;
      } else {
        return parseInt(item.mood) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "Latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === "All" ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"Create a new diary"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
