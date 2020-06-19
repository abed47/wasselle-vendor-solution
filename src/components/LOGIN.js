import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import logoPng from './../assets/images/logo.png';
import {TextField, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SnackBar from '@material-ui/core/Snackbar';

import IconButton from '@material-ui/core/IconButton';
import app from './../utils/base.js';

import {validateLogin} from './../utils/validations.js';

import {MainContext} from './../Context';

const LOGIN = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [allowed, setAllowed] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [disableLoginButton, setDisableLoginButton] = useState(false);

    
    const context = useContext(MainContext);

    const [user, setUser] = context.user;


    useEffect(
        () => {if(localStorage.getItem('user')){
            setAllowed(true)
        }}, [allowed]
    )

    const handleKeyPress = (e) => {
        if(e.key == "Enter"){
            handleLogin();
        }
    }

    const closeSnackBar = () => {
        setShowSnackBar(false)
    }

    const handleInputChange = name => event => {
        switch(name){
            case "username":
                setUsername(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
        }
    }

    const handleLogin = async () => {
        let res = validateLogin({username,password})
        if(res.error){
            setSnackBarMessage(`"Error!", ${res.error.details[0].message}`)
            setShowSnackBar(true)
            return
        }
        
        try {
            await app
            .auth()
            .signInWithEmailAndPassword(username,password)
            .then(res => {
                handleSuccessfulLogin(res.user)
                setSnackBarMessage("Success! redirecting you in a moment.");
                setShowSnackBar(true);
            }).catch(err => {
                setSnackBarMessage("username or password wrong!");
                setShowSnackBar(true)
            });
        }catch(err){
            setSnackBarMessage('Error occurred please try again later!');
            setShowSnackBar(true)
        }
        
    }

    const handleSuccessfulLogin = async (res) => {
        const vendors = app.firestore().collection("vendors");
        let vendor = await vendors.doc(res.uid).get();
        let vendorData = vendor.data();
        let userData = {
            id: res.uid,
            name: vendorData.name,
            address: vendorData.address,
            accountStatus: vendorData.accountStatus
        }
        localStorage.setItem("user",JSON.stringify(userData))
        setUser(userData)
        setAllowed(true);
    }

    return(
        <div className="login__container">
            <div className="login__form">

                {
                    allowed ? <Redirect to="/" push={true} /> : null
                }

                <img src={logoPng} className="form__logo"/>

                <TextField
                className="form__email"
                label="username"
                name="username"
                type="text"
                onChange={handleInputChange('username')}
                value={username}
                onKeyPress={handleKeyPress}
                />

                <TextField
                className="form__password"
                name="password"
                label="password"
                type="password"
                onChange={handleInputChange('password')}
                value={password}
                onKeyPress={handleKeyPress}
                />

                <Button 
                className="form__btn"
                variant="outlined"
                color="primary"
                onClick={() => handleLogin()}
                >Login</Button>

                <Link 
                className="form__forgot_username"
                to="/forgotPassword" > Forget username or password?</Link>

                <SnackBar 
                open={showSnackBar}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                message={snackBarMessage}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                action={
                    [
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={closeSnackBar}>
                            x
                        </IconButton>
                    ]
                }
                />
            </div>
        </div>
    )

}

export default LOGIN