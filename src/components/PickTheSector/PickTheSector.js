import React, { useEffect, useRef, useState } from 'react'
import './PickTheSector.css';
import { useForm } from "react-hook-form";
import { DotLoader } from 'react-spinners';
function PickTheSector() {
   const [sectorData,setSectorData]=useState([]);
   const [userData,setUserData] = useState({});
   const [storedData,setStoredData]=useState([]);
   const [agree,setAgree]=useState(false);
   const [selected,setSelected] = useState();
   const updateAgree=()=>setAgree((prev)=>!prev)
 console.log(agree);
const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit=(userData)=>{
   if(agree==true){
      userData.check=agree;
      setUserData(userData);
      console.log(userData);
   }
   else{
      alert('Please agree to our terms !')
   }
}
useEffect(()=>{
   // sectorData.length?setSpin(false):setSpin(true)
   fetch('https://pick-sector.onrender.com/sector')
   .then(res=>res.json())
   .then(data=>setSectorData(data));
   // setSpin(false);
},[])

useEffect(()=>{
   // setSpin(true);
   if(userData?.name){
      fetch('https://pick-sector.onrender.com/user',{
      method:'POST',
      headers:{
         'content-type':'application/json'
      },
      body:JSON.stringify(userData)
   })
   .then(res=>res.json())
   .then(data=>{
      if(data.name){
        alert('user info saved');
      }
      // setSpin(false)
   })
   }

},[userData]);
useEffect(()=>{
   // setSpin(true);
   fetch('https://pick-sector.onrender.com/user')
   .then(res=>res.json())
   .then(data=>setStoredData(data))
   

//   setSpin(false);
},[]);
let i=0;
let storedDataLength=storedData.length-1;
console.log(storedData[storedDataLength])

  return (
    <div className='main-container'>
    <h2>Please enter your name and pick the Sectors you are currently involved in.
</h2>
{
   sectorData.length===0?<DotLoader className='DotSpin' color="#36d7b7" size={40}/>
   :<form onSubmit={handleSubmit(onSubmit)}>
   <label htmlFor="name">Name:</label>
   <input id="name" defaultValue={storedData[storedDataLength]?.name}  {...register("name",{required:true,pattern: /^[A-Za-z]+$/i })}/>
   <br /><br />
   <label htmlFor="sector">Sector</label>
  
     <select
    
     id="sector" {...register("Sector",{required:true})}>
        {
             sectorData.map((singleData)=>(
               
              <option key={singleData._id} value={singleData.value} selected={(singleData.label===storedData[storedDataLength]?.Sector)?true:false} >{singleData.label}</option>   
             ))
        }
     </select>
  
   <br /><br />
   <input type="checkbox" name="Agree" id="Agree" checked={agree} onChange={updateAgree}    />
   <label htmlFor="Agree">Agree to terms</label>
   <br /><br />
  <input className='save-button' type='submit' value="Save"/>
</form>
}
    </div>
  )
}

export default PickTheSector