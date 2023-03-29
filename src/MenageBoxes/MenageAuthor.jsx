import React, {useState} from "react";
import './MenageAuthor.css';

const MenageAuthor = (props) =>{

    const [addBoxVisible, setAddBoxVisible] = useState(false);
    const [putBoxVisible, setPutBoxVisible] = useState(false);
    const [putNumber, setPutNumber] = useState("0");
    const [showFew, setShowFew] = useState(true);
    

    function handleDeleteIndex(event) {
        const id = event.target.id.replace("delete", "");
        const foundAuthor = props.author.find(author => author.id.toString() === id);
        const authorName = foundAuthor.name;
        let status = "closed";
        if(foundAuthor.status === "closed"){
            status = null;
        }
        setPutBoxVisible(false);
            fetch('http://localhost:8080/author', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: authorName,
                status: status,
            })})
            .then(response => {
            if (response.ok) {
                props.fetchValues();
                setPutBoxVisible(false);
            } else {
                throw new Error('Failed to add author');
            }})
            .catch(error => console.error(error));
      }
      


      const handleAddIndex = () =>{
        setAddBoxVisible(false);
        let highestNumber = 0;
        props.author.forEach(author => {
            if(highestNumber < author.id){highestNumber = author.id}
        });
        highestNumber++;
        fetch('http://localhost:8080/author', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: highestNumber,
            name: document.getElementById("addName").value,
        })})
        .then(response => {
        if (response.ok) {
            props.fetchValues();
            setAddBoxVisible(false);
        } else {
            throw new Error('Failed to add author');
        }})
        .catch(error => console.error(error));
    }
    
        const handlePutIndex = () =>{
            setPutBoxVisible(false);
            fetch('http://localhost:8080/author', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: putNumber,
                name: document.getElementById("putName").value,
            })})
            .then(response => {
            if (response.ok) {
                props.fetchValues();
                setPutBoxVisible(false);
            } else {
                throw new Error('Failed to add author');
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
            {showFew && 
            <table className="tableAuthor" >
                <tbody>
                {props.author.filter(author => author.status !== "closed").map(author => (
                    <tr key={author.id}>
                    <th>{author.name}</th>
                    <th><button  onClick={handleDeleteIndex}  id={`delete${author.id}`} className="button1">delete author</button></th>
                    <th><button onClick={onPut} id={`put${author.id}`} className="button1">edit author</button></th>
                    </tr>))}
                    <tr><th colSpan="3"> <button onClick={onAdd} className="button1">add new author</button></th></tr>
                </tbody>
                <button onClick={() => setShowFew(!showFew)}>show archive</button>
            </table>}

            {showFew ===false && 
            <table className="tableAuthor" >
                <tbody>
                {props.author.map(author => (
                    <tr key={author.id}>
                    <th>{author.name}</th>
                    <th><button onClick={handleDeleteIndex}  id={`delete${author.id}`} className="button1">{author.status === null && "delete author"}{author.status === "closed" && "activate author"}</button></th>
                    <th><button onClick={onPut} id={`put${author.id}`} className="button1">edit author</button></th>
                    </tr>))}
                    <tr><th colSpan="3"> <button onClick={onAdd} className="button1">add new author</button></th></tr>
                </tbody>
                <button onClick={() => setShowFew(!showFew)}>show only active</button>
            </table>}



            {addBoxVisible && <div className="authorBox">
                <p>new author name: <input type="text" name="addName" id="addName"/>
                    <button onClick={handleAddIndex} className="button1">add this author</button>
                </p></div>}
                    
            {putBoxVisible && <div className="authorBox">
                <p>insert author name: <input type="text" name="putName" id="putName"/>
                    <button onClick={handlePutIndex} className="button1">modify this author</button></p></div>}
            
        </div>
    )
}

export default MenageAuthor;
