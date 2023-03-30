import React, {useState, useEffect} from "react";
import './MenageAuthor.css';

const MenageAuthor = (props) =>{

    const [addBoxVisible, setAddBoxVisible] = useState(false);
    const [putBoxVisible, setPutBoxVisible] = useState(false);
    const [putNumber, setPutNumber] = useState("0");
    const [showFew, setShowFew] = useState(true);
    const [popUpVisibility, setPopUpVisibility] = useState(false);
    const [popUpText, setPopUpText] = useState("");
    const [author,setAuthor] = useState([])
    

    const refreshAuthor=()=>{
        fetch('http://localhost:8080/author')
        .then(response => response.json())
        .then(data =>setAuthor(data));
    }
    useEffect(() => {
        refreshAuthor();
    }, []);


    function handleDeleteIndex(event) {
        const id = event.target.id.replace("delete", "");
        fetch(`http://localhost:8080/author/${id}`, {
        method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                refreshAuthor();
            } else {
                throw new Error('Failed to delete author');
        }})
        .catch(error => {
            setPopUpText('Failed to delete author');
            setPopUpVisibility(true)
            console.error(error)
        });
      }
      


      const handleAddIndex = () =>{
        setAddBoxVisible(false);
        let highestNumber = 0;
        author.forEach(author => {
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
            refreshAuthor();
            setAddBoxVisible(false);
        } else {
            throw new Error('Failed to add author');
        }})
        .catch(error => {
            setPopUpText('Failed to add category');
            setPopUpVisibility(true)
            console.error(error)
        });
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
                refreshAuthor();
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
            {popUpVisibility && <div className="popUpBox">
                <img src="/close.png" id="popUpClose" alt="close this window" onClick={()=>setPopUpVisibility(false)}/>
                <h3 className="popUpText">{popUpText}</h3>
            </div>}
            {showFew && 
            <table className="tableAuthor" >
                <tbody>
                {author.filter(author => author.status !== "closed").map(author => (
                    <tr key={author.id}>
                    <th>{author.name}</th>
                    <th><button  onClick={handleDeleteIndex}  id={`delete${author.id}`} className="button1">delete author</button></th>
                    <th><button onClick={onPut} id={`put${author.id}`} className="button1">edit author</button></th>
                    </tr>))}
                    <tr><th colSpan="3"> <button onClick={onAdd} className="button1">add new author</button></th></tr>
                    <tr><th colSpan="3"><img src="/archive.png" alt="show archive" onClick={() => setShowFew(!showFew)} className="archive"/></th></tr>
                </tbody>
                
            </table>}
            
            {showFew ===false && 
            <table className="tableAuthor" >
                <tbody>
                    <tr><th colSpan="3">Jesteś teraz w archiwum</th></tr>
                {author.map(author => (
                    <tr key={author.id}>
                    <th>{author.name}</th>
                    <th><button onClick={handleDeleteIndex}  id={`delete${author.id}`} className="button1">{author.status === null && "delete author"}{author.status === "closed" && "reactivate this author"}</button></th>
                    <th><button onClick={onPut} id={`put${author.id}`} className="button1">edit author</button></th>
                    </tr>))}
                    <tr><th colSpan="3"> <button onClick={onAdd} className="button1">add new author</button></th></tr>
                    <tr><th colSpan="3"><img src="/archive.png" alt="show archive" onClick={() => setShowFew(!showFew)} className="archive"/></th></tr>
                </tbody>
            </table>}



            {addBoxVisible && <div className="authorBox">
                <p>new author name: <input type="text" name="addName" id="addName"/>
                    <button onClick={handleAddIndex} className="button1">add this author</button>
                </p></div>}
                    
            {putBoxVisible && <div className="authorBox">
                <p>insert author name: <input type="text" name="putName" id="putName" defaultValue={author.find(author=> author.id.toString() === putNumber).name}/>
                    <button onClick={handlePutIndex} className="button1">modify this author</button></p></div>}
            
        </div>
    )
}

export default MenageAuthor;
