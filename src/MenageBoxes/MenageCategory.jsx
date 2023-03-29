import React,{useState} from "react";
import './MenageCategory.css';

const MenageCategory = (props) =>{

    
    const [addBoxVisible, setAddBoxVisible] = useState(false);
    const [putBoxVisible, setPutBoxVisible] = useState(false);
    const [putNumber, setPutNumber] = useState("0");
    

    const handleDeleteIndex = (event) => {
        const id = event.target.id.replace("delete", "");
        fetch(`http://localhost:8080/category/${id}`, {
          method: "DELETE"
        })
        .then((data) =>{
            props.fetchValues();
        })
      };


      const handleAddIndex = () =>{
        setAddBoxVisible(false);
        let highestNumber = 0;
        props.category.forEach(category => {
            if(highestNumber < category.id){highestNumber = category.id}
        });
        highestNumber++;
        fetch('http://localhost:8080/category', {
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
            throw new Error('Failed to add category');
        }})
        .catch(error => console.error(error));
    }
    
    const handlePutIndex = () =>{
        setPutBoxVisible(false);
            fetch('http://localhost:8080/category', {
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
                throw new Error('Failed to add category');
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
            <table className="tableCategory" >
                <tbody>
                    {props.category.map(category => (
                    <tr key={category.id}>
                        <th>{category.name}</th>
                        <th><button onClick={handleDeleteIndex} id={`delete${category.id}`} className="button1">delete this category</button></th>
                        <th><button onClick={onPut} id={`put${category.id}`} className="button1">modify this category</button></th>
                    </tr>))}
                    <tr><th colSpan="2"><button onClick={onAdd} className="button1">add category</button></th></tr>
                </tbody>
            </table>
            <div className="delete">
                    {addBoxVisible && <div className="categoryBox">
                        <p>insert category name: <input type="text" name="addName" id="addName"/> 
                        <button onClick={handleAddIndex} className="button1">add this category</button></p>
                    </div>}


                    
                    {putBoxVisible && <div className="categoryBox">
                        <p>insert category name: <input type="text" name="putName" id="putName"/> 
                        <button onClick={handlePutIndex} className="button1">modify this category</button></p>
                    </div>}

                </div>
        </div>
    )
}

export default MenageCategory;
