import React, {useState, useEffect} from "react";
import Card from "./Card";
import "./Window.css"

const Window = (props) =>{
  const [marginLeft, setMarginLeft] = useState("20%");

  useEffect(() => {
    if (props.state.windowSize === "large") {
      setMarginLeft("0%");
    } else {
      setMarginLeft("20%");
    }
  }, [props.state.windowSize]);
  const cards = props.state.game.filter(game => game.status !== "closed").map(game => <Card game={game} key={game.id} onChangeURL={props.onChangeURL} />)
  return(
    <div>
      
        <div className="container" style={{ marginLeft }}>
          {cards}

        </div>

    </div>
  );
}

export default Window;
