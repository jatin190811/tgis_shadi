import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import qs from 'qs'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const [state, setState] = useState({ currentStep: 'step1' })
    const navigate = useNavigate()
    const checkEmail = () => {
        if (state.email) {
            let regEmailEx = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
            let regMobEx = '^[0-9]{10}';
            let result = state.email.match(regEmailEx);
            let result1 = state.email.match(regMobEx)
            console.log(result, result1)
            if (result || result1) {
                return true;
            }
            else {
                toast.error('Invalid email address or mobile number', {});
            }

        } else {
            toast.error('Please Enter Email', {});
        }

    }



    const checkPassword = () => {
        if (state.password) {
            let regEx = "[a-z]+";
            let result = state.password.match(regEx);
            if (result) {
                return true;
            }
            else {
                toast.error('Invalid password format', {});
            }

        } else {
            toast.error('Please Enter Password', {});
        }
    }



    const checkData = () => {

        if (!state.name) {
            toast.error('Please Enter Name', {});
            return false
        }
        if (state.name.length < 3) {
            toast.error('Please Enter Name with atleast 3 characters', {});
            return false
        }

        if (state.name.length > 32) {
            toast.error('Please Enter Name with atmost 32 characters', {});
            return false
        }

        if (!checkEmail()) return false
        if (!checkPassword()) return false


        if (state.password != state.cpassword) {
            toast.error('Password and confirm password does not match', {});
            return false
        }

        axios({
            method: 'post',
            url: 'http://134.209.153.76:8090/api/v1/register',
            data: qs.stringify({
                email: state.email,
                password: state.password,
                number : state.mobile,
                name : state.name
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((resp) => {
            if (resp.statusText == "OK") {
                if (resp.data.status == 'error') { toast.error(resp.data.message, {}); }
                else {
                    setState({...state, currentStep : 'step2', ref : resp.data.data.ref})

                }
                
            } else {
                toast.error('Something went wrong', {});
            }
        })

    }

    const doRegister = () => {

        if (!state.otp) {
            toast.error('Please Enter Name', {});
            return false
        }
        if (state.otp.length != 6) {
            toast.error('Please Enter Valid OTP', {});
            return false
        }

        axios({
            method: 'post',
            url: 'http://134.209.153.76:8090/api/v1/verify-register',
            data: qs.stringify({
                ref: state.ref,
                otp: state.otp,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((resp) => {
            if(resp.statusText == "OK"){
                if(resp.data.status =='error') toast.error(resp.data.message, {});
                localStorage.setItem('token',resp.data.data.token)
                localStorage.setItem('profile',JSON.stringify(resp.data.data.profile))
                navigate('/onboarding')
            } else  {
                toast.error('Something went wrong', {});
            }
        
        })


    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
            />
            <div style={{ maxWidth: '100vw' }} className="container main" id='register'>
                <div className="row mainrow">
                    <div className="col-md-5 hero">
                        <div className="text-center text-white">
                            <p className="image-text">India’s Best<br /> Wedding Planning <br />Platform </p>
                        </div>
                    </div>
                    <div className="col-md-7  text-center heropy">
                        <div className='logo-div'>
                            <img src="/pic/logo.png" alt="" sizes="" className="logo-img" />
                        </div>                        <h2>Sign Up</h2>
                        {state.currentStep == 'step1' && <>
                            <label className="float-start pt-5">Full Name</label>
                            <div className="input-group pt-1">
                                <input type="text" onChange={(e) => setState({ ...state, name: e.target.value })} className="form-control newb" placeholder="Enter Full Name" />
                            </div>

                            <label className="float-start pt-5">Email</label>
                            <div className="input-group pt-1">
                                <input type="text" onChange={(e) => setState({ ...state, email: e.target.value })} className="form-control newb" placeholder="Enter Email Address" />
                            </div>

                            <label className="float-start pt-5">Mobile Number</label>
                            <div className="input-group pt-1">
                                <input type="text" onChange={(e) => setState({ ...state, mobile: e.target.value })} className="form-control newb" placeholder="Enter Mobile Number" />
                            </div>

                            <label className="float-start pt-5">Enter New Password</label>
                            <div className="input-group pt-1">
                                <input type="password" onChange={(e) => setState({ ...state, password: e.target.value })} className="form-control newb" placeholder="Enter Password" />
                            </div>

                            <label className="float-start pt-5">Re-enter  Password</label>
                            <div className="input-group pt-1">
                                <input type="password" onChange={(e) => setState({ ...state, cpassword: e.target.value })} className="form-control newb" placeholder="Re-enter Password" />
                            </div>

                            <button className="onboardbtn mt-5" onClick={checkData}>Next</button>
                        </>}
                        {state.currentStep == 'step2' && <>
                            <label className="float-start pt-5">Enter OTP</label>
                            <div className="input-group pt-1">
                                <input type="text" onChange={(e) => setState({ ...state, otp: e.target.value })} className="form-control newb" placeholder="Enter OTP" />
                            </div>
                            <span style={{ float: 'left' }}>One Time Password has been send to your email/mobile number</span>
                            <button className="onboardbtn mt-5" onClick={doRegister}>Sign Up</button>
                        </>}
                    </div>
                </div>

            </div></>
    )
}

export default Login;