import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Ptest = () => {
    const navigate = useNavigate()
    
  const a = true;
  useEffect(()=>{ 
    if(!a){ 
        navigate('/atest')
    }
   },[])
  return a?  <Outlet/> :  null ;
};

export default Ptest;
