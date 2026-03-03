import {Heart} from 'lucide-react'
import '../styles/card.css'
export default function Cart(){
return(
    <>
    <div id='card'>
        <img id="arduino" src="src/assets/Arduino_Uno_-_R3.jpg"></img>
        <p>Arduino Uno R3 </p><br></br>
        <p className='pr-6'>A small, easy-to-use board to build electronics projects like robots, lights, and sensors.</p>
        
        <div id='button'>
        <button id="cart">Add cart</button>
        <button id="wish">
           <Heart size={20} color='grey'/>    
        </button>    
    </div></div>
    </>
);
}