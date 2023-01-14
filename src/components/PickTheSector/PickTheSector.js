import React, { useEffect, useRef, useState } from 'react'
import './PickTheSector.css';
import { useForm } from "react-hook-form";
function PickTheSector() {
   const [sectorData,setSectorData]=useState([]);
   const [userData,setUserData] = useState({});
   const [storedData,setStoredData]=useState([]);
   const [agree,setAgree]=useState(false);
   const updateAgree=()=>setAgree((prev)=>!prev)
 
const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit=(userData)=>{
   if(agree==true){
      setUserData(userData);
      // console.log(userData);
   }
   else{
      alert('Please agree to our terms !')
   }
}
useEffect(()=>{
   fetch('http://localhost:5000/sector')
   .then(res=>res.json())
   .then(data=>setSectorData(data));
},[])

useEffect(()=>{
   if(userData?.name){
      fetch('http://localhost:5000/user',{
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
   })
   }

},[userData]);
useEffect(()=>{
   fetch('http://localhost:5000/user')
   .then(res=>res.json())
   .then(data=>setStoredData(data))
  
},[]);
let storedDataLength=storedData.length-1;
console.log(storedDataLength);

  return (
    <div className='main-container'>
    <h2>Please enter your name and pick the Sectors you are currently involved in.
</h2>
<form onSubmit={handleSubmit(onSubmit)}>
    <label htmlFor="name">Name:</label>
    <input id="name" defaultValue={storedData[storedDataLength]?.name}  {...register("name",{required:true,pattern: /^[A-Za-z]+$/i })}/>
    <br /><br />
    <label htmlFor="sector">Sector</label>
    <select
     
    id="sector" {...register("Sector",{required:true})}>
       {
            sectorData.map((singleData)=>(
             <option  value={singleData.value}>{singleData.label}</option>   
            ))
       }
    </select>
    <br /><br />
    <input type="checkbox" name="Agree" id="Agree" checked={agree} onChange={updateAgree}  required  />
    <label htmlFor="Agree">Agree to terms</label>
    <br /><br />
   <input className='save-button' type='submit' value="Save"/>
</form>
    </div>
  )
}

export default PickTheSector