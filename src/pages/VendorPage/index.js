import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import qs from 'qs'
import axios from 'axios';
import './index.css';

import 'react-toastify/dist/ReactToastify.css';
function VendorPage() {
    const [state, setState] = useState()
    const checkEmail = () => {
        if (state.email) {
            let regEmailEx = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
            let regMobEx = '^[0-9]{10}';
            let result = state.email.match(regEmailEx);
            let result1 = state.email.match(regMobEx)
            console.log(result, result1)
            if (result || result1) {
                setState({ ...state });
                submitVendorDetails();
            }
            else {
                toast.error('Invalid email address or mobile number', {});
            }

        } else {
            toast.error('Please Enter Email', {});
        }

    }

    const submitVendorDetails = () => {
        axios({
            method: 'post',
            url: 'http://134.209.153.76:8090/api/v1/vendors/request',
            data: {...state},
            headers: {
                'content-type': 'application/json'
            }
        }).then((resp) => {
            if (resp.statusText == "OK") {
                if (resp.data.status == 'error') toast.error(resp.data.message, {});
                else if (resp.data.status == 'success') {
                    toast.success('Details catputed successfully', {});
                }
            } else {

            }
        }) 
    }

    const doLogin = () => {
        axios({
            method: 'post',
            url: 'http://134.209.153.76:8090/api/v1/login',
            data: qs.stringify({
                username: state.email,
                password: state.password,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((resp) => {
            if (resp.statusText == "OK") {
                if (resp.data.status == 'error') toast.error(resp.data.message, {});
                localStorage.setItem('token', resp.data.data.token)
                localStorage.setItem('profile', JSON.stringify(resp.data.data.profile))
                if (resp.data.data.isOnboarding == false) {
                    window.location.href = '/onboarding'
                }
                else
                    window.location.href = '/'
            } else {

            }
        })
    }

    const checkPassword = () => {
        if (state.password) {
            let regEx = "[a-z]+";
            let result = state.password.match(regEx);
            if (result) {
                doLogin()
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
            <div className="container main">
                <div className="row mainrow">
                    <div className="col-md-6 ">
                    <img src="pic/vendor-banner.png" alt="" sizes="" className="img-fluid" />
                    </div>
                    <div className="col-md-6  text-center heropy">
                        <img src="/pic/logo.png" alt="" width="212" sizes="" className="img-fluid" />
                        <h2 className='vendor-heading'>Grow your Business</h2>
                        <form className="py-3" onSubmit={(event) => event.preventDefault()}>
                            <div className="row">
                                <div className="col-md-12">
                                    <input type="text"  className="form-control botm" onChange={(event) => setState({ ...state, brand_name: event.target.value })} placeholder="Brand Name" name="name" required/>
                                </div>
                                <div className="col-md-12">
                                    <input type="text"  onChange={(event) => setState({ ...state, city: event.target.value })} className="form-control botm" placeholder="City" name="name" required/>
                                </div>
                                <div className="col-md-12">
                                <select className="form-control form-select vendor-select" onChange={(e) => setState({ ...state, type: e.target.value })}>
                                    <option value="" >Select Type</option>
                                    <option value="venue">Venue</option>
                                    <option value="makeup">Makeup</option>
                                    <option value="photographer">Photographer</option>
                                    <option value="bridalwear">Bridalwear</option>
                                    <option value="groomwear">Groomwear</option>
                                    <option value="mehndi">Mehndi</option>
                                    <option value="decor">Decor</option>
                                </select>
                                </div>
                                <div className="col-md-12">
                                    <input type="email"  className="form-control botm" onChange={(event) => setState({ ...state, email: event.target.value })} placeholder="Email ID" name="email" />
                                </div>
                                <div className="col-md-12">
                                    <input type="" onChange={(event) => setState({ ...state, phone: event.target.value })} className="form-control botm" placeholder="Mobile Number" name="tel" required/>
                                </div>
                                </div>
                        </form>

                        <button className="onboardbtn mt-5" onClick={checkEmail} >Next</button>
                    </div>
                </div>

            </div></>
    )
}

export default VendorPage;