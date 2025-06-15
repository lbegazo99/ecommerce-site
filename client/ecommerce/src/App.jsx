import Header from "./header";
import NavBar from "./navBar";
import { ImageSlider } from "./ImageSlider";
import chamberlain from "./Images/chamberlain.jpg"
import fortyniners from "./Images/49ers.jpg"
import Knicks from "./Images/Knicks.jpg"
import yankees from "./Images/yankees.jpg"


const IMAGES = [chamberlain,fortyniners,Knicks,yankees];

function App(){
   return(
      <>
         <Header/>
         <NavBar/>
         <div style={{maxWidth:"1200px", width:"100%",aspectRatio: "10/6", margin:"0 auto"}}>
         <ImageSlider imageUrls={IMAGES}/>
         </div>
      </>
   )
}



export default App;