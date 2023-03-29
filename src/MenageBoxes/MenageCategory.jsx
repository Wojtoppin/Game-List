import React,{useState, useEffect} from "react";
import './MenageCategory.css';

const MenageCategory = (props) =>{

    
    const [addBoxVisible, setAddBoxVisible] = useState(false);
    const [putBoxVisible, setPutBoxVisible] = useState(false);
    const [putNumber, setPutNumber] = useState("0");
    const [popUpVisibility, setPopUpVisibility] = useState(false);
    const [popUpText, setPopUpText] = useState("");
    const [category,setCategory] = useState([])
    

    const refreshCategory=()=>{
        fetch('http://localhost:8080/category')
        .then(response => response.json())
        .then(data =>setCategory(data));
    }
    useEffect(() => {
        refreshCategory();
    }, []);



    const handleDeleteIndex = (event) => {
        const id = event.target.id.replace("delete", "");
        fetch(`http://localhost:8080/category/${id}`, {
          method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                refreshCategory();
            } else {
                throw new Error('Failed to delete category');
        }})
        .catch(error => {
            setPopUpText('Failed to delete category');
            setPopUpVisibility(true)
            console.error(error)
        });
      };



      const handleIndex = (method) =>{
        let requestBody = {};

        if (method === "add"){
            let highestNumber = 0;
            category.forEach(category => {
                if(highestNumber < category.id){highestNumber = category.id}
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
        fetch('http://localhost:8080/category', {
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
                refreshCategory();
            } else {
                throw new Error('Failed to add category');
            }
        })
        .catch(error => {
            if(method === "add"){
                setPopUpText('Failed to add category');
            }else{
                setPopUpText('Failed to modify category');
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
            setPutBoxVisible(!putBoxVisible);
            if (addBoxVisible) {
                setAddBoxVisible(false);
            }
            if(!putBoxVisible){
                const categoryId = event.target.id.replace("put", "");
                setPutNumber(categoryId.toString());
            }
            
        }
        

    return(
        <div className="display">
            {popUpVisibility && <div className="popUpBox">
                <img src="/close.png" id="popUpClose" alt="close this window" onClick={()=>setPopUpVisibility(false)}/>
                <h3 className="popUpText">{popUpText}</h3>
            </div>}

            <table className="tableCategory" >
                <tbody>
                    {category.filter(category => category.status !== "closed").map(category => (
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
                        <button onClick={() =>handleIndex("add")} className="button1">add this category</button></p>
                    </div>}


                    
                    {putBoxVisible && <div className="categoryBox">
                        <p>insert category name: <input type="text" name="putName" id="putName" defaultValue={category.find(category=>category.id.toString() === putNumber).name}/> 
                        <button onClick={() => handleIndex("put")} className="button1">modify this category</button></p>
                    </div>}

                </div>
        </div>
    )
}

export default MenageCategory;
