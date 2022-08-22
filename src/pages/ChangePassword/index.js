import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import qs from 'qs'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
function ChangePassword() {
    const [state, setState] = useState({ currentStep: 'step1' })
    const navigate = useNavigate()




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

        
        if (!checkPassword()) return false


        if (state.password != state.cpassword) {
            toast.error('Password and confirm password does not match', {});
            return false
        }

        axios({
            method: 'post',
            url: 'http://146.190.30.14:8090/api/v1/register',
            data: qs.stringify({
                oldPassword: state.oldPassword,
                newPassword: state.nPassword,
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

    


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
            />
            <div style={{ maxWidth: '100vw' }} className="container main">
                <div className="row mainrow">
                    <div className="col-md-5 hero">
                        <div className="text-center text-white">
                            <p className="image-text">India’s Best<br /> Wedding Planning <br />Platform </p>
                        </div>
                    </div>
                    <div className="col-md-7  text-center heropy">
                        <div className='logo-div'>
                            <img src="/pic/logo.png" alt="" sizes="" className="logo-img" />
                        </div>                        <h2>Change Password</h2>
                       

                            <label className="float-start pt-5">Enter Old Password</label>
                            <div className="input-group pt-1">
                                <input type="password" onChange={(e) => setState({ ...state, password: e.target.value })} className="form-control newb" placeholder="Enter Password" />
                            </div>

                            <label className="float-start pt-5">Enter New Password</label>
                            <div className="input-group pt-1">
                                <input type="password" onChange={(e) => setState({ ...state, npassword: e.target.value })} className="form-control newb" placeholder="Re-enter Password" />
                            </div>

                            <label className="float-start pt-5">Confirm New Password</label>
                            <div className="input-group pt-1">
                                <input type="password" onChange={(e) => setState({ ...state, cpassword: e.target.value })} className="form-control newb" placeholder="Re-enter Password" />
                            </div>

                            <button className="onboardbtn mt-5" onClick={checkData}>Next</button>
                        
                        {/* {state.currentStep == 'step2' && <>
                            <label className="float-start pt-5">Enter OTP</label>
                            <div className="input-group pt-1">
                                <input type="text" onChange={(e) => setState({ ...state, otp: e.target.value })} className="form-control newb" placeholder="Enter OTP" />
                            </div>
                            <span style={{ float: 'left' }}>One Time Password has been send to your email/mobile number</span>
                            <button className="onboardbtn mt-5" onClick={doRegister}>Sign Up</button>
                        </>} */}
                    </div>
                </div>

            </div></>
    )
}

export default ChangePassword;