import React, { useState} from "react";
import './Filter.css';

const Filter = (props) =>{
    const [author, setAuthor] = useState([]);
    const [category, setCategory] = useState([]);
    const [platform, setPlatform] = useState([]);

    let [showFilters, setShowFilter] = useState(false);
    const toggleFilters = () => {
        setShowFilter(!showFilters);
    };

    const fetchValues=()=>{
        fetch('http://localhost:8080/author')
        .then(response => response.json())
        .then(data =>setAuthor(data));
    
        fetch('http://localhost:8080/category')
        .then(response => response.json())
        .then(data =>setCategory(data));
    
        fetch('http://localhost:8080/platform')
        .then(response => response.json())
        .then(data =>setPlatform(data));
      }
      useState(()=>{
        fetchValues();
    },[])
    
    const getValues = () =>{
        const price = document.getElementById("price").value;
        const author = document.getElementById("author").value;
        const category = document.getElementById("category").value;
        const platform = document.getElementById("platform").value;
        
        let newURL =  'http://localhost:8080/game?';
        if(price !== ""){
            if (price === "0"){
                newURL += "price=0.01&";
            }else{
                newURL += "price=" + price + "&";
            }
        }
        if(author !== "0"){
            newURL += "author=" + author + "&";
        }
        if(category !== "0"){
            newURL += "category=" + category + "&";
        }
        if(platform !== "0"){
            newURL += "platform=" + platform + "&";
        }
        setShowFilter(false);
        props.onChangeURL(newURL);
    }
    return(
        <div className="filter">
            <img src="/filter.png" alt="show filters" onClick={toggleFilters} className="image"/>
            {showFilters && <div className="filterBox">
                Sort by:
                <table className="filterBoxWidth">
                    <tbody>
                        
                        <tr><th>maximum price: </th><th><input type="number" min="0.00" step="0.01" className="boxWidth" id="price"/></th>
                        <th>author:</th><th><select className="boxWidth" id="author"><option value="0" ></option>{author.map(author=> <option key={author.id} value={author.name}>{author.name}</option>)}</select></th>
                        <th>category: </th><th><select className="boxWidth" id="category"><option value="0" ></option>{category.map(category=> <option key={category.id} value={category.name}>{category.name}</option>)}</select></th>
                        <th>platform: </th><th><select className="boxWidth" id="platform"><option value="0" ></option>{platform.map(platform=> <option key={platform.id} value={platform.name}>{platform.name}</option>)}</select></th>
                        <th><button onClick={getValues} className="filterButton">filter games</button></th></tr>
                    </tbody>
                </table>
            </div>}

        </div>


    )
} 

export default Filter;