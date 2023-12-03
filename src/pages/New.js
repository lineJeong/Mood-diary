import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

function New() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Mood diary - New diary`;
  }, []);

  return <div>{<DiaryEditor />}</div>;
}

export default New;
