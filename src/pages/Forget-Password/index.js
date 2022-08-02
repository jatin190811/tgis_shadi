import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import qs from 'qs'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


function ForgetPassword() {
    const [state, setState] = useState({ currentStep: 'step1' })
    const navigate = useNavigate();

    const checkEmail = () => {
        if (state.username) {
            let regEmailEx = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
            let regMobEx = '^[0-9]{10}';
            let result = state.username.match(regEmailEx);
            let result1 = state.username.match(regMobEx)
            console.log(result, result1)
            if (result || result1) {
                axios({
                    method: 'post',
                    url: 'http://146.190.30.14:8090/api/v1/forget-password',
                    data: qs.stringify({
                        username: state.username,
                    }),
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then((resp) => {
                    if (resp.statusText == "OK") {
                        if (resp.data.status == 'error') toast.error(resp.data.message, {});
                        else {
                            setState({...state, ref : resp.data.data.ref, currentStep:'step2' })
                            return 
                        }
                    } else {
                        toast.error('Something went wrong', {});
                    }
        
                })
            }
            else {
                toast.error('Invalid email address or mobile number', {});
            }

        } else {
            toast.error('Please Enter Email', {});
        }

    }

    const checkOTP = () => {
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
            url: 'http://146.190.30.14:8090/api/v1/recover-password',
            data: qs.stringify({
                ref: state.ref,
                otp: state.otp,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((resp) => {
            if (resp.statusText == "OK") {
                if (resp.data.status == 'error') toast.error(resp.data.message, {});
                else {
                    setState({...state, ref : resp.data.data.ref, currentStep:'step3' })
                    return 
                }
            } else {
                toast.error('Something went wrong', {});
            }

        })
    }


    const changePassword = () => {
        if (state.password) {
            let regEx = "[a-z]+";
            let result = state.password.match(regEx);
            if (result) {
                axios({
                    method: 'post',
                    url: 'http://146.190.30.14:8090/api/v1/change-password',
                    data: qs.stringify({
                        ref: state.ref,
                        password: state.password,
                    }),
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then((resp) => {
                    if (resp.statusText == "OK") {
                        if (resp.data.status == 'error') toast.error(resp.data.message, {});
                        else {
                           toast.success('Password Successfully Updated');
                           setTimeout(()=>{
                                navigate("/login");
                           },3000)
                            return 
                        }
                    } else {
                        toast.error('Something went wrong', {});
                    }
        
                })


            }
            else {
                toast.error('Invalid password format', {});
            }

        } else {
            toast.error('Please Enter Password', {});
        }
    }



   


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
            />
            <div className="container main py-5">
                <div className="row mainrow">
                    <div className="col-md-6 hero">
                        <div className="text-center text-white">
                            <p className="image-text">India’s Best<br /> Wedding Planning <br />Platform </p>
                        </div>
                    </div>
                    <div className="col-md-6  text-center heropy">
                        <img src="/pic/logo.png" alt="" sizes="" className="img-fluid" />
                        <h2>Forget Password?</h2>
                        {state.currentStep == 'step1' && <>
                            <label className="float-start mt-5">Email ID or Mobile Number</label>
                            <div className="input-group pt-3">
                                <span className="input-group-text"><i className='far fa-user-circle' style={{ fontSize: '36px' }}></i></span>
                                <input onChange={(e) => setState({ ...state, username: e.target.value })}  type="text" className="form-control newb" placeholder="Enter Email or Mobile" />
                            </div>

                            <button className="onboardbtn mt-5" onClick={checkEmail}>Next</button>
                        </>}
                        {state.currentStep == 'step2' && <>
                            <div className="input-group pt-5">
                                <span className="input-group-text"><i className='far fa-user-circle' style={{ fontSize: '36px' }}></i></span>
                                <input onChange={(e) => setState({ ...state, otp: e.target.value })} type="text" className="form-control newb" placeholder="Enter OTP" />
                                <span className="input-group-text"><i className="fas fa-times-circle" style={{ fontSize: '36px' }}></i></span>
                            </div>    
                            <div className="col-md-12 py-2"><p>One Time Password has been send to your mail/mobile number</p>
                            </div>
                            <button className="onboardbtn mt-5" onClick={checkOTP}>Next</button>
                        </>}
                        {state.currentStep == 'step3' && <>
                            <label className="float-start pt-5">Enter New Password</label>
                            <div className="input-group pt-1">
                                <input onChange={(e) => setState({ ...state, password: e.target.value })} type="password"  className="form-control newb" placeholder="Enter Password" />
                            </div>

                            <label className="float-start pt-5">Re-enter  Password</label>
                            <div className="input-group pt-1">
                                <input onChange={(e) => setState({ ...state, cpassword: e.target.value })}  type="password" className="form-control newb" placeholder="Re-enter Password" />
                            </div>

                            <button className="onboardbtn mt-5" onClick={changePassword}>Reset New Password</button>
                        </>}
                    </div>
                </div>

            </div></>
    )
}

export default ForgetPassword;