import "./Card.css"
import React from "react";
const Card = (props) =>{

    return (
        <div className="card" style={{
            backgroundImage: `url('${props.game.gameImage}')`
          }}>
                

            <div className="text">
                <p className="GameTitle">
                    Game title: {props.game.title}
                </p>
                
                <p onClick={()=>props.onChangeURL(`http://localhost:8080/game?author=${props.game.author.name}`)}>
                    author: {props.game.author.name}
                </p>
                <p className="category" >
                    categories:
                    {props.game.category.map(category => (
                        <li key={category.id} onClick={()=>props.onChangeURL(`http://localhost:8080/game?category=${category.name}`)}>{category.name}</li>
                    ))}
                </p>
                <p className="platform" >
                    platforms:
                    {props.game.platform.map(platform => (
                        <li key={platform.id} onClick={()=>props.onChangeURL(`http://localhost:8080/game?platform=${platform.name}`)}>{platform.name}</li>
                    ))}
                </p>
            </div>
            
        </div>
    );
}

export default Card;