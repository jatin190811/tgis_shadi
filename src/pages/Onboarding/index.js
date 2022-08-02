import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import qs from 'qs'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Onboarding() {
    const [state, setState] = useState({ currentStep: 'step1' })
    const [cities, setCities] = useState([])
    const navigate = useNavigate();
    const utoken = localStorage.getItem('token')

    useEffect(()=> {
        axios({
            method: 'post',
            url: 'http://146.190.30.14:8090/api/v1/cities',
        }).then((resp) => {
            if (resp.statusText == "OK") {
                if (resp.data.status == 'error') toast.error(resp.data.message, {});
                else {
                   setCities(resp.data.data)
                }
            } else {
                toast.error('Something went wrong', {});
            }

        })
    },[])
    const saveFinal = () => {
        if (!state.personal) {
            toast.error('Please Select Engaged Personal', {});
            return false
        }

        if (!state.date) {
            toast.error('Please Select Wedding Date', {});
            return false
        }

        if (!state.city) {
            toast.error('Please Select City', {});
            return false
        }

        if (!state.budget) {
            toast.error('Please Select Budget', {});
            return false
        }


        axios({
            method: 'post',
            url: 'http://146.190.30.14:8090/api/v1/onboarding',
            data: qs.stringify({
                city: state.city,
                budget: state.budget,
                date: state.date,
                personal: state.personal,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'x-access-token' : utoken
            }
        }).then((resp) => {
            if (resp.statusText == "OK") {
                if (resp.data.status == 'error') toast.error(resp.data.message, {});
                else {
                    window.location.href = '/'
                    return 
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
            <div className="row mainrow">
                <div className="col-md-6 hero1">
                    <img src="pic/step/pat.png" alt="" sizes="" className="img-fluid patti" />
                    <div className="card hellocard"   >
                        <img src="pic/step/banner1.png" className="card-img-top img-fluid" />
                        <div className="card-body text-center text-white bodyhero pb-5">
                            <p className="account" style={{ color: '#f180ab' }}>GET YOUR <img src="pic/icon/icon.png" alt="logo" style={{ width: '35px' }} /> CHANCE</p>
                            <h2 className="card-title">
                                Pawan & Suman
                            </h2>
                            <p className="card-text py-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard</p>
                        </div>
                    </div>

                </div>


                <div className="col-md-6  text-center heropy">
                    <img src="/pic/logo.png" alt="" sizes="" className="img-fluid" />
                    <h2 className="mt-5">Tell us who you are?</h2>




                    <div className="row text-center">
                        {state.currentStep == 'step1' && <>
                            <div className="col-lg-4 col-md-4 col-sm-12 text-black ">
                                <div className="card border  px-2 py-2 splc " style={{ backgroundColor: (state.personal == 'bride' ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, personal: 'bride' })}>
                                    <center>
                                        <img src="pic/ct/bride.png" alt="mumbai" className="img-fuild" width="60%;" />
                                    </center>
                                    <div className="text-light-gray pt-3">
                                        <h3>Bride</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 text-black">
                                <div className="card border  px-2 py-2 splc" style={{ backgroundColor: (state.personal == 'groom' ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, personal: 'groom' })}>
                                    <center>
                                        <img src="pic/ct/groom.png" alt="mumbai" className="img-fuild" width="60%;" />
                                    </center>
                                    <div className="text-light-gray pt-3">
                                        <h3>Groom</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 text-black">
                                <div className="card border  px-2 py-2 splc" style={{
                                    backgroundColor: (['bride', 'groom'].includes(state.personal) || !state.per)
                                        ? '#fff' : '#F180AB'
                                }} >
                                    <center>
                                        <img src="pic/ct/user.png" alt="mumbai" className="img-fuild" width="60%;" />
                                    </center>
                                    <div className="text-light-gray pt-3">
                                        <h3>Others</h3>
                                    </div>
                                </div>
                            </div>
                            {state.currentStep == 'step1' && <div className="col-12">
                                <select className="form-select my-5" onChange={(e) => setState({ ...state, personal: e.target.value })}>
                                    <option value="" >Others</option>
                                    <option>Self 1</option>
                                    <option>For Test 2</option>
                                    <option>For son 3</option>
                                    <option>For Brother 4</option>
                                </select>
                            </div>
                            }
                        </>
                        }


                        {state.currentStep == 'step2' && <div className="col-md-12  text-center heropy" style={{ paddingTop: '0px' }}>
                            <h2 className="mt-5">Do you have a wedding date?</h2>
                            <form >
                                <div className="row py-3">
                                    <div className="col-12">
                                        <input onChange={(e) => {
                                            setState({ ...state, date: e.target.value })
                                        }} type="date" id="birthday" name="birthday" className='form-control' />

                                    </div>
                                </div>

                                <h2 className=" py-4 ">Which city is your wedding in?</h2>
                                <div className="row text-center">
                                    <div className="col-lg-3 col-md-3 col-sm-12 text-black ">
                                        <div className="card border  px-1 py-2" style={{ backgroundColor: (state.city == 'mumbai' ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, city: 'mumbai' })}>
                                            <center>
                                                <img src="pic/ct/m.png" alt="mumbai" className="img-fuild" width="60%;" />
                                            </center>
                                            <div className="text-light-gray pt-3">
                                                <h3> Mumbai</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12 text-black">
                                        <div className="card border  px-1 py-2" style={{ backgroundColor: (state.city == 'delhi' ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, city: 'delhi' })}>
                                            <center>
                                                <img src="pic/ct/i.png" alt="mumbai" className="img-fuild" width="60%;" />
                                            </center>
                                            <div className="text-light-gray pt-3">
                                                <h3> Delhi</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-3 col-sm-12 text-black">
                                        <div className="card border  px-0 py-2" style={{ backgroundColor: (state.city == 'chandigarh' ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, city: 'chandigarh' })}>
                                            <center>
                                                <img src="pic/ct/m.png" alt="mumbai" className="img-fuild" width="60%;" />
                                            </center>
                                            <div className="text-light-gray pt-3">
                                                <h3> Chandigrah</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-3 col-sm-12 text-black">
                                        <div className="card border  px-1 py-2" style={{ backgroundColor: (state.city == 'hyderabad' ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, city: 'hyderabad' })}>
                                            <center>
                                                <img src="pic/ct/h.png" alt="mumbai" className="img-fuild" width="60%;" />
                                            </center>
                                            <div className="text-light-gray pt-3">
                                                <h3> Hyderabad</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">


                                        <select className="form-select my-5" onChange={(e) => setState({ ...state, city: e.target.value })}>
                                            <option value="" >Select Other Cities</option>
                                            {cities && cities.length && cities.map(item => <option>{item.city}</option>)}
                                            
                                        </select>
                                    </div>
                                </div>


                            </form>
                        </div>}
                        {state.currentStep == 'step3' && <><div className="row text-center py-md-5">

                            <div className="col-md-4">
                                <div className="card" style={{ backgroundColor: (state.budget == '< 15 Lakhs' ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, budget: '< 15 Lakhs' })}>
                                    <div className="card-body lakhs">
                                        {'< 15 Lakhs'}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card" style={{ backgroundColor: (state.budget == '15-30 Lakhs'  ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, budget: '15-30 Lakhs' })}>
                                    <div className="card-body lakhs">
                                        15-30 Lakhs
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4" >
                                <div className="card" style={{ backgroundColor: (state.budget == '30-40 Lakhs' ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, budget: '30-40 Lakhs' })}>
                                    <div className="card-body lakhs">
                                        30-40 Lakhs
                                    </div>
                                </div>
                            </div>


                        </div>
                            <div className="row text-center pb-5">

                                <div className="col-md-4">
                                    <div className="card" style={{ backgroundColor: (state.budget == '30-50 Lakhs' ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, budget: '30-50 Lakhs' })}>
                                        <div className="card-body lakhs">
                                            30-50 Lakhs
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card" style={{ backgroundColor: (state.budget == '50 Lakhs-1 Crore' ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, budget: '50 Lakhs-1 Crore' })}>
                                        <div className="card-body lakhs">
                                            50 Lakhs-1 Crore
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card" style={{ backgroundColor: (state.budget == '1+ Crore' ? '#F180AB' : '#fff') }} onClick={() => setState({ ...state, budget: '1+ Crore' })}>
                                        <div className="card-body lakhs">
                                            1+ Crore
                                        </div>
                                    </div>
                                </div>
                            </div></>}
                    </div>

                    <div className="row  mt-5">
                        {(state.currentStep == 'step2' || state.currentStep == 'step3') && <div className="col-md-6">
                            <button href="#" onClick={() => {
                                if (state.currentStep == 'step2') {
                                    setState({ ...state, currentStep: 'step1' })
                                } else {
                                    setState({ ...state, currentStep: 'step2' })
                                }
                            }
                            } className="onboardbtn">Previous</button>
                        </div>}
                        {(state.currentStep == 'step1' || state.currentStep == 'step2') && <div className="col-md-6">
                            <button onClick={() => {
                                if (state.currentStep == 'step1') {
                                    setState({ ...state, currentStep: 'step2' })
                                } else {
                                    setState({ ...state, currentStep: 'step3' })
                                }
                            }
                            } className="onboardbtn" >Next</button>
                        </div>}
                        {state.currentStep == 'step3' && <div className="col-md-6">
                            <button onClick={saveFinal} className="onboardbtn" >Submit</button>
                        </div>}
                    </div>
                </div>
            </div></>
    )

}

export default Onboarding;