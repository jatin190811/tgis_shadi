import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function Profile() {

  const [state, setState] = useState({});
  const [nameState, setNameState] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)

  // let url = 'http://146.190.30.14:8090/api/v1/profile';

  // console.log("profile")
  const updateDetails = () => {
    let url = 'http://146.190.30.14:8090/api/v1/profile';
    axios({
      method: 'POST',
      url,
      headers: {
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    }).then((resp) => {
      if (resp.statusText == "OK") {
        if (resp.data.status == 'error') toast.error(resp.data.message, {});
        else if (resp.status = 'success') {
          setUserProfile(resp.data.data)
        }
      } else {

      }
    })
  }
  useEffect(() => {
    let url = 'http://146.190.30.14:8090/api/v1/profile';
    axios({
      method: 'POST',
      url,
      headers: {
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    }).then((resp) => {
      if (resp.statusText == "OK") {
        if (resp.data.status == 'error') toast.error(resp.data.message, {});
        else if (resp.status = 'success') {
          setUserProfile(resp.data.data)
        }
      } else {

      }
    })
  }, [])

  const updateProfile = () => {
    let url = 'http://146.190.30.14:8090/api/v1/update-profile';
    axios({
      method: 'POST',
      url,
      headers: {
        'x-access-token': localStorage.getItem('token'),
        'content-type': 'application/json'
      },
      data: { email: state.email ? state.email : userProfile.email, 
        number: state.number ? state.number : userProfile.number, 
        name: (nameState.firstName ? nameState.firstName : userProfile.name.split(" ")[0]) + " " + 
        (nameState.lastName ? nameState.lastName : userProfile.name.split(" ")[1])
      }
    }).then((resp) => {
      if (resp.statusText == "OK") {
        if (resp.data.status == 'error') {
          ref1.current.value = '';
          ref2.current.value = '';
          ref3.current.value = '';
          ref4.current.value = '';
          toast.error(resp.data.message, {})
        }
        else if (resp.status = 'success') {
          toast("Profile updated successfully!")
          updateDetails();
          ref1.current.value = '';
          ref2.current.value = '';
          ref3.current.value = '';
        }

      } else {

      }
    })
  }
  const getFirstName = () => {
    if(userProfile.name) {
      return userProfile.name.split(" ")[0]
    }
  }
  const getLastName = () => {
    if(userProfile.name) {
      return userProfile.name.split(" ")[1]
    }
  }

  const logout = ()=> {
    localStorage.removeItem('token');
    window.location.href = '/'
  }  
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
      />
      <div className="container-fluid  boximgages" style={{ backgroundImage: 'url("pic/ct/probanner.png")' }} >
        <div className="row">
          <div className="clo-lg-12 col-md-12 col-sm-12">

            <h1 className="ct-text text-white text-center">Profile</h1>
          </div>

        </div>
      </div>



      <div className="container p-lg-5">
        <div className="row">
          <div className="col-md-7">
            <h2>About Me</h2>
            <p>We’re always ready to help and make your wedding better.</p>
            <form className="py-3" onSubmit={(event) => event.preventDefault()}>
              <div className="row">
                <div className="col">
                  <input type="text" ref={ref1} className="form-control botm" onChange={(event) => setNameState({ ...nameState, firstName: event.target.value })} placeholder={getFirstName()} name="name" />
                </div>
                <div className="col">
                  <input type="text" ref={ref2} onChange={(event) => setNameState({ ...nameState, lastName: event.target.value })} className="form-control botm" placeholder={getLastName()} name="name" />
                </div>
              </div>
              <div className="row mt20">
                <div className="col">
                  <input type="email" ref={ref3} className="form-control botm" onChange={(event) => setState({ ...state, email: event.target.value })} placeholder={userProfile.email} name="email" />
                </div>
                <div className="col">
                  <input type="" ref={ref4} onChange={(event) => setState({ ...state, phone: event.target.value })} className="form-control botm" placeholder={userProfile.number} name="tel" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btsk mt-5" onClick={updateProfile}>Update Details</button>
              <button type="submit" className="btn btn-primary btsk mt-5" style={{marginLeft:'47%'}} onClick={logout}>Logout</button>
            </form>
          </div>
          <div className="col-md-4 text-center overflowscl " >
            <img src="pic/ct/main.png" alt="logo" width="250" height="350" />
          </div>
        </div>
      </div></>
  )
}

export default Profile;