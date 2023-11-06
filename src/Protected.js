import React from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
const Protected = ({ children })=>{
    console.log(children);
    let tkn = localStorage.getItem('token')
    if(!tkn)
    {
        return <Navigate to='/' replace />;
    }else{
        return<Header>{children}</Header>
    }


}
export default Protected;
