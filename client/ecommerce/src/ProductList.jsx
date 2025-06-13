import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function ProductList(){
    const [products,setProducts] = useState([])
    const {category} = useParams();

    useEffect(() => {
     fetch(`http://localhost:3000/products/league/${category}`)
       .then(res => res.json())
       .then((data) => setProducts(data))
       .catch((err) => console.err("Failed to fetch products",err));
    },[]);

    return(
        <div>
            <ul>
                {products.map((product) => (
                    <li key = {product.product_id}>
                        {product.product_description} - {product.price}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductList;