import React,{useEffect, useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {MainContext} from './../Context';

const HOME = () => {

    const [toLogin, setToLogin] = useState(false);

    const context = useContext(MainContext);

    const [user, setUser] = context.user;
    
    useEffect(() => {
        if(!user.id){
           setToLogin(true);
        }
    },[user])
    
    return(
        <div className="home__container">
            {
                toLogin ?  (<Redirect to="/login" push={true}/>) : null
            }
            home
            <button onClick={() => console.log(user)} >click</button>
        </div>
    )
}

export default HOME;

