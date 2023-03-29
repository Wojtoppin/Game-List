import React,{useEffect, useState} from "react";
import './MenagePlatform.css';

const MenagePlatform = (props) =>{
    const [addBoxVisible, setAddBoxVisible] = useState(false);
    const [putBoxVisible, setPutBoxVisible] = useState(false);
    const [putNumber, setPutNumber] = useState("0");
    const [popUpVisibility, setPopUpVisibility] = useState(false);
    const [popUpText, setPopUpText] = useState("");
    const [platform,setPlatform] = useState([])
    

    const refreshPlatform=()=>{
        fetch('http://localhost:8080/platform')
        .then(response => response.json())
        .then(data =>setPlatform(data));
    }
    useEffect(() => {
        refreshPlatform();
    }, []);


    const handleDeleteIndex = (event) => {
        const id = event.target.id.replace("delete", "");
        fetch(`http://localhost:8080/platform/${id}`, {
        method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                refreshPlatform();
            } else {
                throw new Error('Failed to delete platform');
        }})
        .catch(error => {
            setPopUpText('Failed to delete platform');
            setPopUpVisibility(true)
            console.error(error)
        });
    };

    const handleIndex = (method) =>{

        let requestBody = {};

        if (method === "add"){
            let highestNumber = 0;
            platform.forEach(platform => {
                if(highestNumber < platform.id){highestNumber = platform.id}
            });
            highestNumber++;
            requestBody = {
                id: highestNumber,
            };
        }else{
            requestBody = {
                id: putNumber,
            };
        }

        let methods = "";
        if (method === "add"){
            methods = "POST";
        }else{
            methods = "PUT";
        }

        requestBody.name = document.getElementById(method+"Name").value;
        
        fetch('http://localhost:8080/author', {
            method: methods,
            headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                setAddBoxVisible(false);
                setPutBoxVisible(false);
                refreshPlatform();
            } else {
                throw new Error('Failed to add author');
            }
        })
        .catch(error => {
            if(method === "add"){
                setPopUpText('Failed to add author');
            }else{
                setPopUpText('Failed to modify author');
            }
            setPopUpVisibility(true)
            console.error(error)
        });
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
            <table className="tablePlatform" >
                <tbody>
                    
                    {platform.filter(platform => platform.status !== "closed").map(platform => (
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
                        <button onClick={() =>handleIndex("add")} className="button1">add this platform</button></p>
                    </div>}


                    
                    {putBoxVisible && <div className="platformBox">
                        <p>insert new name: <input type="text" name="putName" id="putName" defaultValue={platform.find(platform => platform.id.toString() === putNumber).name}/> 
                        <button onClick={() =>handleIndex("put")} className="button1">modify this platform</button></p>
                    </div>}

                </div>
        </div>
    )
}

export default MenagePlatform;
