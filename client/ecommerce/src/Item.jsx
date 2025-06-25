import {useState,useEffect} from "react"
import "./item.css"
import {useNavigate, useParams} from "react-router-dom";

function Item(){
    const navigate = useNavigate();
    const {id} = useParams();
    const[info,setinfo] =  useState(null);

    const[dropdown,setDropdown] = useState(false);
    const[number,setNumber] = useState("1");

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
        .then(res => res.json())
        .then(data => {console.log(data); setinfo(data[0])})
        .catch(err => console.error("Error fetching product:", err));
    },[id])
   
   const handleClick = (Clickednumber) => {
        setDropdown(dropdown=> !dropdown);
        setNumber(Clickednumber);
    }

    const handleAddToCart = async (product_id, quantity) =>{
        const token = localStorage.getItem("token")

        if(!token){
            navigate("/login");
            return;
        }  
        console.log(product_id,quantity)
        try {
           const res =  await fetch("http://localhost:3000/user/addToCart",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({
                product_id,
                quantity
            })
        })

        if(res.status === 403){
            navigate("/login")
            return
        }

        if (!res.ok) {
            throw new Error("Failed to add to cart");
          }

        } catch (err) {
            console.error("Add to cart error:", err);
        }
       

    }

    


    if (!info) return <div>Loading...</div>;

    return(
       <>
                <div id = "box">
                    <div id = "image"> <img className = "itemImage"src={info.thumbnail} alt = "product" /></div>
                    <div id = "info">
                    <div id = "productDescription">{info.product_description}</div>
                    <div id = "price">Your Price: ${info.price}</div>
                    <div id = "itemOption">
                        <p style={{marginLeft:"32px",fontSize:"20px"}}>size</p>
                        <div className="sizeOption">
                            <button className="size">S</button>
                            <button className="size">M</button>
                            <button className="size">L</button>
                            <button className="size">XL</button>
                        </div>

                        <div id="quantityAndAddToCartSection">
                            <p style={{marginLeft:"32px",fontSize:"20px"}}>Quantity</p>
                            <div id="addToCartSection">
                                <div id="dropDownForItemPage">
                                <div onClick={() => handleClick("1")} id = "numberOfProductSelector">
                                    <p style={{marginLeft:"5px"}}>{number}</p>
                                </div>
                                { dropdown === true && <div id = "numberOfProductDropdown">
                                    <p onClick = {() => handleClick("1")} style={{marginLeft:"5px"}}>1</p>
                                    <p onClick = {() => handleClick("2")} style={{marginLeft:"5px"}}>2</p>
                                    <p  onClick = {() => handleClick("3")} style={{marginLeft:"5px"}}>3</p>
                                    <p  onClick = {() => handleClick("4")} style={{marginLeft:"5px"}}>4</p>
                                    <p  onClick = {() => handleClick("5")} style={{marginLeft:"5px"}}>5</p>
                                </div>}
                                </div>
                                <button onClick = {() => handleAddToCart(info.product_id,parseInt(number))} className="addToCart">Add To Cart</button>
                            </div>
                        </div>
                        
                    </div>
                    </div>,
                </div>
       </>
    )


}



export default Item;