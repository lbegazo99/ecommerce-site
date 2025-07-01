
import {useEffect,useState } from "react";

import "./Cart.css"
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

    const getCartTotal = () =>{
     return cart.reduce((sum,item) => sum + item.price * item.quantity,0).toFixed(2);
    }

    const handleCheckout = async () => {
      const token = localStorage.getItem("token");
      const now = new Date();
      const timestamp = now.toISOString();
      for(const item of cart){
          try{
            const res = await fetch(`http://localhost:3000/user/cart/${item.product_id}`,{
              method:"DELETE",
              headers:{
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
              },
              body: JSON.stringify({
                timestamp: timestamp,
              })
            });
    
            if(!res.ok){
              throw new Error("Failed to delete item");
            }
    
            alert("Item deleted!");
          }catch(err){
            console.error("Delete error:",err);
          }
        }
    }
  

    return(
        <div>
           {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className="checkoutPage">
        <div className="layout">
          {cart.map((item, index) => (
            <div className="cartDiv" key={index}>
                <div ><img className="cartImage" src={item.thumbnail}/></div>
                <div className="cartItemInfo">
                  <div>{item.product_description}</div>
                  <div style={{marginTop:"40px",marginLeft:"40px"}}>
                    <button className="cartDivButton"> Size L</button>
                    <button className="cartDivButton"> Quantity {item.quantity}</button>
                  </div>
                </div>
                <p style={{marginLeft:"50px",marginBottom:"130px"}}>{item.price}</p>
            </div>
          ))}
        </div>
        <div className="checkOutArea">
          <div className="orderSummary">
            <div style={{marginLeft:"10px",fontSize:"20px"}}>Order Summary</div>
            <div style={{borderTop:"1px solid black",width:"300px"}}></div>
            <div style={{marginLeft:"10px",fontSize:"20px"}}>Cart Total: ${getCartTotal()}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100px"} }>
            <button onClick={handleCheckout} className="checkoutButton">Checkout</button>
          </div>
          
        </div>
        </div>
      )}
        </div>
    )

}

export default Cart