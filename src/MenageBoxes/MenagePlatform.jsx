import React,{useState} from "react";
import './MenagePlatform.css';

const MenagePlatform = (props) =>{

    
    const [addBoxVisible, setAddBoxVisible] = useState(false);
    const [putBoxVisible, setPutBoxVisible] = useState(false);
    const [putNumber, setPutNumber] = useState("0");
    

    const handleDeleteIndex = (event) => {
        const id = event.target.id.replace("delete", "");
        fetch(`http://localhost:8080/platform/${id}`, {
        method: "DELETE"
        })
        .then((data) =>{
            props.fetchValues();
        })
    };


    const handleAddIndex = () =>{
        let highestNumber = 0;
        props.platform.forEach(platform => {
            if(highestNumber < platform.id){highestNumber = platform.id}
        });
        highestNumber++;
        fetch('http://localhost:8080/platform', {
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
        } else {
            throw new Error('Failed to add platform');
        }})
        .catch(error => console.error(error));
    }
    
        const handlePutIndex = () =>{
            fetch('http://localhost:8080/platform', {
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
            } else {
                throw new Error('Failed to add platform');
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
            <table className="tablePlatform" >
                <tbody>
                    
                    {props.platform.map(platform => (
                    <tr key={platform.id}>
                        <th>{platform.name}</th>
                        <th><button onClick={handleDeleteIndex} id={`delete${platform.id}`} className="button1">delete this platform</button></th>
                        <th><button onClick={onPut} id={`put${platform.id}`} className="button1">modify this platform</button></th>
                    </tr>))}
                    <tr><th colSpan="2"><button onClick={onAdd} className="button1">add platform</button></th></tr>
                </tbody>
            </table>
            <div className="delete">
                    {addBoxVisible && <div className="platformBox">
                        <p>insert platform name: <input type="text" name="addName" id="addName"/> 
                        <button onClick={handleAddIndex} className="button1">add this platform</button></p>
                    </div>}


                    
                    {putBoxVisible && <div className="platformBox">
                        <p>insert new name: <input type="text" name="putName" id="putName"/> 
                        <button onClick={handlePutIndex} className="button1">modify this platform</button></p>
                    </div>}

                </div>
        </div>
    )
}

export default MenagePlatform;
