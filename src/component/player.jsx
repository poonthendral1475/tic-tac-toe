import { useState } from "react";
export default function player({ initialName, symbol ,isActive ,onChangeName}) {
  const [val,set]=useState(initialName)
  const [isEditing, setIsEditing] = useState(false);
  function handleClickChange() {
    setIsEditing((editing) => !editing);
    if(isEditing)
    {
      onChangeName(symbol,val)
    }
  }
  function handleChange(e){
    set(e.target.value)
  }
  return (
    <li className={isActive ? 'active' : undefined} >
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{val}</span>
        ) : (
          <input type="text" required value={val} onChange={handleChange}/>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClickChange}>{isEditing ? "save" : "edit"}</button>
    </li>
  );
}
