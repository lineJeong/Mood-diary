function MoodItem({ mood_id, mood_img, mood_descript, onClick, isSelected }) {
  return (
    <div
      onClick={() => onClick(mood_id)}
      className={[
        "MoodItem",
        isSelected ? `MoodItem_on_${mood_id}` : "MoodItem_off",
      ].join(" ")}
    >
      <img src={mood_img} alt={mood_img} />
      <span>{mood_descript}</span>
    </div>
  );
}

export default MoodItem;
