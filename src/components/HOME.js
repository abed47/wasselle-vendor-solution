import React,{useEffect, useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {MainContext} from './../Context';
import NAVBAR from './NAVBAR';

const HOME = (props) => {

    const [toLogin, setToLogin] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard");

    const context = useContext(MainContext);

    const [user, setUser] = context.user;
    
    useEffect(() => {
        if(!user.id){
           setToLogin(true);
        }else{
            setToLogin(false)
        }
    },[user])
    
    return(
        <div className="home__container">
            {
                //TODO: remove commented code
                //toLogin ?  (<Redirect to="/login" push={true}/>) : null
            }
            home
            <button onClick={() => console.log(props)} >click</button>
        </div>
    )
}

export default HOME;

