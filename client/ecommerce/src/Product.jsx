import {useParams } from "react-router-dom"
import {useEffect,useState} from 'react'
import "./product.css"
import { Link } from "react-router-dom";
function Product(){
    const {teamName} = useParams();
    const [jerseys,setJerseys] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/products/jerseys/team/${teamName}`)
        .then((res) => res.json())
        .then(data => setJerseys(data))
        .catch(err => console.error("error fetching products",err))
    },[teamName])

    return(
        <div className="productContainer">
            {
                jerseys.map((item) => (
                    <div className = "productContainerDiv"key={item.product_id}>
                       <Link to = {`/item/${item.product_id}`}>
                        <img className = "productImage" src={item.thumbnail} alt="photo of player jersey" />
                            {item.product_description}
                            {item.price}
                       </Link> 
                    </div>
                ))
            }
        </div>
    );

}

export default Product