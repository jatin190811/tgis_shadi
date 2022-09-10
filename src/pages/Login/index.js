// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { Link } from "react-router-dom";
// import qs from 'qs'
// import axios from 'axios';

// import 'react-toastify/dist/ReactToastify.css';
// function Login() {
//     const [state, setState] = useState({ currentStep: 'step1' })
//     const checkEmail = () => {
//         if(state.email) {
//             let regEmailEx = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
//             let regMobEx = '^[0-9]{10}';
//             let result = state.email.match(regEmailEx);
//             let result1 = state.email.match(regMobEx)
//             console.log(result,result1)
//             if(result || result1) {
//                 setState({...state, currentStep: 'step2'});
//             }
//             else {
//                 toast.error('Invalid email address or mobile number', {});
//             }

//         } else {
//             toast.error('Please Enter Email', {});
//         }

//     }

//     const doLogin = () => {
//        axios({
// 			method: 'post',
// 			url: 'http://134.209.153.76:8090/api/v1/login',
// 			data: qs.stringify({
// 				username: state.email,
// 				password: state.password,
// 			}),
// 			headers: {
// 			  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
// 			}
// 		  }).then((resp) => {
//             if(resp.statusText == "OK"){
//                 if(resp.data.status =='error') toast.error(resp.data.message, {});
//                 localStorage.setItem('token',resp.data.data.token)
//                 localStorage.setItem('profile',JSON.stringify(resp.data.data.profile))
//                 if(resp.data.data.isOnboarding == false) {
//                     window.location.href = '/onboarding'
//                 }
//                 else
//                 window.location.href = '/'
//             } else  {

//             }
// 		})
//     }

//     const checkPassword = () => {
//         if(state.password) {
//             let regEx = "[a-z]+";
//             let result = state.password.match(regEx);
//             if(result) {
//                 doLogin()
//             }
//             else {
//                 toast.error('Invalid password format', {});
//             }

//         } else {
//             toast.error('Please Enter Password', {});
//         }
//     }

//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 />
//             <div className="container main py-5">
//                 <div className="row mainrow">
//                     <div className="col-md-6 hero">
//                         <div className="text-center text-white">
//                             <p className="image-text">India’s Best<br /> Wedding Planning <br />Platform </p>
//                         </div>
//                     </div>
//                     <div className="col-md-6  text-center heropy">
//                         <img src="/pic/logo.png" alt="" sizes="" className="img-fluid" />
//                         <h2>Welcome Back!</h2>
//                         <p>Sign In</p>
//                         <div className="image my-5 py-2 "><img src="pic/icon/google.png" width="40px" className="img-fluid mrleft" /> Continue with Google
//                         </div>
//                         <div className="image my-5  py-2"><img src="pic/icon/facebook.png" width="40px" className="img-fluid mrleft" /> Continue with Facebook
//                         </div>


//                         <div className="row pb-4">
//                             <div className="col-md-3">
//                                 <hr />
//                             </div>
//                             <div className="col-md-6"><p className="hr-text">or sign in with Email/Mobile</p></div>
//                             <div className="col-md-3">
//                                 <hr />
//                             </div>
//                         </div>
//                         {(state.currentStep == 'step1' || state.currentStep == 'step2') && <><label className="float-start">Email ID or Mobile Number</label>
//                             <div className="input-group pt-3">
//                                 <span className="input-icon input-group-text"><i className='far fa-user-circle' style={{ fontSize: '36px' }}></i></span>
//                                 <input onChange={(e)=>setState({...state, email: e.target.value})} type="text" className="login-input form-control newb" placeholder="Enter Email or Mobile" disabled={state.currentStep == 'step2'} />
//                             </div></>}
//                         {state.currentStep == 'step2' && <>
//                             <label className="float-start pt-5">Enter your password</label>
//                             <div className="input-group pt-1">
//                                 <input type="password" onChange={(e)=>setState({...state, password: e.target.value})} className="form-control newb" placeholder="Enter Password" />
//                             </div>
//                             <div className="col-md-12 py-2"><p className="float-end" >Forget Password?</p>
//                             </div>
//                         </>}
//                         {state.currentStep == 'step1' && <button className="onboardbtn mt-5" onClick={checkEmail} >Next</button> }
//                         {state.currentStep == 'step2' && <button className="onboardbtn mt-5" onClick={checkPassword} >Login</button> }
//                         <p className="mt-3">Dont't have account? <Link to="/register"> Sign Up</Link></p>

//                         <div className="row mt-5 pt-5">
//                             <div className="col-md-6 py-2"><p>Are you a vendor?</p></div>
//                             <div className="col-md-6">
//                                 <Link to="/quote"  ><button className="onboardbtn">Register Now</button></Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div></>
//     )
// }

// export default Login;

















import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import qs from 'qs'
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const [state, setState] = useState({ currentStep: 'step1' })
    const checkEmail = () => {
        if (state.email) {
            let regEmailEx = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
            let regMobEx = '^[0-9]{10}';
            let result = state.email.match(regEmailEx);
            let result1 = state.email.match(regMobEx)
            console.log(result, result1)
            if (result || result1) {
                setState({ ...state, currentStep: 'step2' });
            }
            else {
                toast.error('Invalid email address or mobile number', {});
            }

        } else {
            toast.error('Please Enter Email', {});
        }

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
    
    const responseFacebook = (data) =>{
        console.log("dataaaa",data)
    }

    const responseGoogle = (data) =>{
        console.log("dataaaa",data)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                />
            <div style={{ maxWidth: '100%' }} className="main">
                <div className="row mainrow">
                    <div className="col-md-5 hero">
                        <div className="text-center text-white">
                            <p className="image-text">India’s Best<br /> Wedding Planning <br />Platform </p>
                        </div>
                    </div>
                    <div className="col-md-7  text-center heropy">
                    <div className='logo-div'>
                            <img src="/pic/logo.png" alt="" sizes="" className="logo-img" />
                        </div>                         <h2 style={{ fontWeight: '600' }}>Welcome Back!</h2>
                        <p style={{ fontWeight: '500', color: 'black' }}>Sign In</p>
                        <div style={{ textAlign: 'center', display: 'inline-block' }}>
                           
                            <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    render={renderProps => (
        <div style={{cursor: 'pointer'}} className="my-4 py-2 flex-login"><img src="pic/icon/google.png" width="35px" className="img-fluid mrleft" /> Continue with Google
        </div>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
                           
                            <FacebookLogin
  appId="423171089728998"
  callback={responseFacebook}
  render={renderProps => (
    
    <div className="my-4 py-2 flex-login" onClick={renderProps.onClick} style={{cursor: 'pointer'}}><img src="pic/icon/facebook.png" width="35px" className="img-fluid mrleft" /> Continue with Facebook
    </div>
  )}
/>
                        </div>

                        <div className="row pb-4">
                            <div className="col-md-3">
                                <hr />
                            </div>
                            <div className="col-md-6"><p className="hr-text">or sign in with Email/Mobile</p></div>
                            <div className="col-md-3">
                                <hr />
                            </div>
                        </div>
                        {(state.currentStep == 'step1' || state.currentStep == 'step2') && <><label style={{ fontSize: '14px', fontWeight: '700' }} className="float-start">Email ID or Mobile Number</label>
                            <div style={{ width: '100%' }} className="input-group pt-3">
                                <span className="input-icon input-group-text"><i className='far fa-user-circle' style={{ fontSize: '36px' }}></i></span>
                                <input style={{ marginRight: '5%', fontSize: '14px' }} onChange={(e) => setState({ ...state, email: e.target.value })} type="text" className="login-input form-control newb" placeholder="Enter Email or Mobile" disabled={state.currentStep == 'step2'} />
                            </div></>}
                        {state.currentStep == 'step2' && <>
                            <label className="float-start pt-5">Enter your password</label>
                            <div className="input-group pt-1">
                                <input type="password" onChange={(e) => setState({ ...state, password: e.target.value })} className="form-control newb" placeholder="Enter Password" />
                            </div>
                            <div className="col-md-12 py-2"><Link to="/forget-password" className="float-end">Forget Password?</Link>
                            
                            </div>
                        </>}
                        {state.currentStep == 'step1' && <button className="onboardbtn mt-3" onClick={checkEmail} >Next</button> }
                        {state.currentStep == 'step2' && <button className="onboardbtn mt-3" onClick={checkPassword} >Login</button> }
                        <p style={{ fontWeight: '500', fontSize: '14px' }} className="mt-3">Dont't have account? <Link to="/register"> Sign Up</Link></p>
                        
                        <div style={{}} className="row mt-4 pt-5 flex">
                            <div className="col-md-5 py-2">
                                {/* <p  style={{ fontSize: '14px', color: 'black' }} >Are you a vendor?</p> */}
                                <Link to="/"  >< button  style={{ fontSize: '14px', backgroundColor: 'transparent', color: 'black' }} className="onboardbtn">Are you a vendor?</button></Link>
                                </div>
                            <div className="col-md-4">
                                <Link to="/vendor"  >< button  style={{ fontSize: '14px' }} className="onboardbtn">Register Now</button></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div></>
    )
}

export default Login;