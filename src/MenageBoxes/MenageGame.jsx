import React,{useState} from "react";
import './MenageGame.css';

const MenageGame = (props) =>{

    const [addBoxVisible, setAddBoxVisible] = useState(false);
    const [putBoxVisible, setPutBoxVisible] = useState(false);
    const [putNumber, setPutNumber] = useState("0");
    

    const handleDeleteIndex = (event) => {
        const id = event.target.id.replace("delete", "");
        const url = `http://localhost:8080/game/${id}`;
        fetch(url,{method:"DELETE"})
        .then((data) =>{
            props.fetchValues();
            setAddBoxVisible(false);
        })
      };

      const handleAddIndex = () =>{
        let highestNumber = 0;
        props.state.game.forEach(game => {
            if(highestNumber < game.id){highestNumber = game.id}
        });
        highestNumber++;

        var platform = document.getElementById('addPlatform');
        var selectedPlatform = [...platform.options].filter(option => option.selected).map(option => option.value);
        
        var category = document.getElementById('addCategory');
        var selectedCategory = [...category.options].filter(option => option.selected).map(option => option.value);

        fetch('http://localhost:8080/game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: highestNumber,
            title: document.getElementById('addTitle').value,
            price: document.getElementById('addPrice').value,
            author: {id: document.getElementById('addAuthor').value},
            yearOfRelease: null,
            platform: selectedPlatform.map(id => ({ id })),
            category: selectedCategory.map(id => ({ id })),
            
        })})
        .then(response => {
        if (response.ok) {
            props.fetchValues();
            setAddBoxVisible(false);
        } else {
            throw new Error('Failed to add game');
        }})
        .catch(error => console.error(error));

        }
    
    
        const handlePutIndex = () =>{

            var platform = document.getElementById('putPlatform');
            var selectedPlatform = [...platform.options].filter(option => option.selected).map(option => option.value);
            
            var category = document.getElementById('putCategory');
            var selectedCategory = [...category.options].filter(option => option.selected).map(option => option.value);

            fetch('http://localhost:8080/game', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: putNumber,
                title: document.getElementById('putTitle').value,
                price: document.getElementById('putPrice').value,
                author: {id: document.getElementById('putAuthor').value},
                yearOfRelease: null,
                platform: selectedPlatform.map(id => ({ id })),
                category: selectedCategory.map(id => ({ id })),
            })})
            .then(response => {
            if (response.ok) {
                props.fetchValues();
                setPutBoxVisible(false);
            } else {
                throw new Error('Failed to put game');
            }})
            .catch(error => console.error(error));
        }

        const onAdd = () => {
            setAddBoxVisible(!addBoxVisible);
            if(putBoxVisible){setPutBoxVisible(false)}

        }
        const onPut = (event) => {
            setPutNumber(event.target.id.replace("put", ""));
            setPutBoxVisible(!putBoxVisible);
            if(addBoxVisible){setAddBoxVisible(false)}
        }
    

    return(
        <div className="display">
            <div className="tableGame">
                <table >
                    <tbody>
                        <tr className="headers"><th>title</th><th>author</th><th>price</th><th>category</th><th>platform</th></tr>
                        {props.state.game.map(game => (
                        <tr key={game.id}>
                            <th>{game.title}</th>
                            <th>{game.author.name}</th>
                            <th>{game.price}PLN</th>
                            <th>{game.category.map(category=>(<h5 key={category.id}>{category.name}</h5>))}</th>
                            <th>{game.platform.map(platform=>(<h5 key={platform.id}>{platform.name}</h5>))}</th>
                            <th><button onClick={handleDeleteIndex} className="button1" id={`delete${game.id}`}>delete this game</button></th>
                            <th><button onClick={onPut} className="button1" id={`put${game.id}`}>modify this game</button></th>
                        </tr>))}
                        <tr><th colSpan="2"><button onClick={onAdd} className="button1">add new game</button></th></tr>
                    </tbody>
                </table>
            </div>
            
                    {addBoxVisible && <div className="gameBox">
                        <table className="insertTable">
                            <tr><th colSpan="2">(hold ctrl and click on options if you want to choose multiple)</th></tr>
                            <tr><th colSpan="2">insert new game: </th></tr>
                            <tr><th>title: </th><th><input type="text" name="addTitle" id="addTitle"/></th> </tr>
                            <tr><th>price: </th><th><input type="number" min="0.00" step="0.01" name="addPrice" id="addPrice"/></th> </tr>
                            <tr><th> author:</th> <th><select name="addAuthor" id="addAuthor">
                                {props.state.author.map(author=>(<option value={author.id} key={author.id}>{author.name}</option>))}
                            </select></th></tr>
                            <tr><th>platform: </th><th><select name="addPlatform" id="addPlatform" multiple>
                                {props.state.platform.map(platform=>(<option key={platform.id} value={platform.id}>{platform.name}</option>))}
                            </select></th></tr>
                            <tr><th>category: </th><th><select name="addCategory" id="addCategory" multiple>
                                {props.state.category.map(category=>(<option key={category.id} value={category.id}>{category.name}</option>))}
                            </select></th></tr>
                        </table>
                        <button onClick={handleAddIndex} className="button2">add this game</button>
                    </div>}




                    
                    {putBoxVisible &&<div className="gameBox">
                        <table className="insertTable">
                            <tr><th colSpan="2">(hold ctrl and click on options if you want to choose multiple)</th></tr>
                            <tr><th colSpan="2">modify existing game: </th></tr>
                            <tr><th>title: </th><th><input type="text" name="putTitle" id="putTitle"/></th> </tr>
                            <tr><th>price: </th><th><input type="number" min="0.00" step="0.01" name="putPrice" id="putPrice"/></th> </tr>
                            <tr><th> author:</th> <th><select name="putAuthor" id="putAuthor">
                                {props.state.author.map(author=>(<option value={author.id}>{author.name}</option>))}
                            </select></th></tr>
                            <tr><th>platform: </th><th><select name="putPlatform" id="putPlatform" multiple>
                                {props.state.platform.map(platform=>(<option key={platform.id} value={platform.id}>{platform.name}</option>))}
                            </select></th></tr>
                            <tr><th>category: </th><th><select name="putCategory" id="putCategory" multiple>
                                {props.state.category.map(category=>(<option key={category.id} value={category.id}>{category.name}</option>))}
                            </select></th></tr>
                        <button onClick={handlePutIndex} className="button2">modify this game</button></table>
                    </div>}
                </div>
    )
}

export default MenageGame;
