import React,{useEffect} from 'react'
import Homepage from './home/home.page'

const Index = () => {
    useEffect(()=>{
      localStorage.clear();
     
    },[])
   
  return (
    <div >
        <Homepage /> 
    </div>
  )
}

export default Index