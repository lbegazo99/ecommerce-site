import {useEffect,useState } from "react";
import { data } from "react-router-dom";

function Cart(){
    const[cart,setCart] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token")

        fetch("http://localhost:3000/user/cart",{
          headers:{
            "Authorization":`Bearer ${token}`
          },
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCart(data);
        })
        .catch((err) => {
            console.error("Fetch cart error:", err);
        })
    },[])



    return(
        <div>
           {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div className="CartDiv" key={index}>
                <div><img src={item.thumbnail}/></div>
                <div>{item.product_description}</div>
                <div>{item.quantity}</div>
            </div>
          ))}
        </div>
      )}
        </div>
    )

}

export default Cart