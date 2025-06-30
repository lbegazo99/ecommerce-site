import React from "react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import "./ImageSlider.css"

export function ImageSlider({imageUrls}){
    const [imageIndex,setImageIndex] = useState(0);

    function showNextImage(){
        setImageIndex(index => {
            if(index === imageUrls.length-1) return 0;
            return index+1;
        })
    }

    function showPrevImage(){
       setImageIndex(index => {
           if(index === 0) return imageUrls.length-1;
           return index-1;
       })
    }
    return <div style={{width: "100%", height:"100%", position:"relative",marginTop:"50px"}}>
        <div style={{width: "100%", height: "100%", display:"flex" ,overflow: "hidden"}}>
            {imageUrls.map(url =>(
                 <img 
                 key={url} 
                 src = {url}
                 className = "image-slider-image"
                 style={{translate: `${-100 * imageIndex}%`}} />
            ))}
        </div>
        <button onClick = {showPrevImage}className="img-slider-btn" style={{left:0}}><FaArrowLeft/></button>
        <button onClick = {showNextImage} className="img-slider-btn" style={{right:0}}><FaArrowRight/></button>
        <div style = {{
            display: "flex",
            position: "absolute",
            bottom: ".5rem",
            left: "50%",
            translate:"-50%",
            gap: "5px",
        }}>
            {imageUrls.map((_,index) => (
                <button 
                key={index} className="img-slider-dot-btn" 
                onClick={() => setImageIndex(index)}>
                {index === imageIndex ? <FaRegDotCircle/> : <FaRegCircle/> }
                </button>
            ))}
        </div>
    </div>


}