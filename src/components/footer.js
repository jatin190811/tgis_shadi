import React, { useState } from 'react';
import './footer.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Send from "../assets/send.svg";

function Footer() {
    const [email, setEmail] = useState();
    const checkEmail = () => {
        if (email) {
            let regEmailEx = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
            let result = email.match(regEmailEx);
            if (result) {
                subscribe();
            }
            else {
                toast.error('Invalid email address', {});
            }

        } else {
            toast.error('Please Enter Email', {});
        }

    }
    const subscribe = () => {
		let url = 'http://146.190.30.14:8090/api/v1/subscribe';
		axios({
			method: 'POST',
			url,
			headers: {
				'content-type': 'application/json'
			},
			data : {email}
		}).then((resp) => {
			if (resp.statusText == "OK") {
				if (resp.data.status == 'error') toast.error(resp.data.message, {});
				else if(resp.data.status == 'success') {
					toast.success(resp.data.message, {})
				}
			} else {
	
			}
		})
	}
return(
    <>
    <ToastContainer
                position="top-right"
                autoClose={5000}
            />
<div className="footer-container container-mt-5 p-4 text-center">
  <div className="row mt-3">
    <div className='col-lg-1 col-md-1'></div>
      <div className="col-lg-5 col-md-4 col-sm-12 pad-foot">
      <h3 className="text-start footer-h3 py-3">Newsletter</h3>
      <p style={{ fontSize: '1rem'}} className="foot-bt-pad text-start pb-3">Don't miss our significant news and season sales. Subscribe!</p>
      
     <form onSubmit={(event) => event.preventDefault()}>
      <div style={{ position: 'relative' }} className="row row-no-gutters">
          <div style={{ maxWidth: '80%' }} className="col input-group news-section mx-3">
          <input type="text"  placeholder="Enter Your Email" onChange={(event) => setEmail(event.target.value)} className="form-control news-email"/>
          <button className="send-btn" onClick={checkEmail}><span><img src={ Send } alt='send' /></span></button>
          </div>
          {/* <div className="col ">
           <button className="send-btn" onClick={checkEmail}><span><img src={ Send } alt='send' /></span></button>
          </div> */}
    </div>
    </form>
    
      </div>
      <div className="col-lg-3 col-md-3 col-sm-12 px-5">
          <h3 className="text-start footer-h3 py-3">HIt Us Up:</h3>
          <p style={{ fontWeight: '600' }} className="text-start foot-bt-pad">+1 800 452 78 87</p>
          <p className="text-start foot-bt-pad">info@sitename.com</p>
          <p className="text-start foot-bt-pad">27 Division St, New York, NY 10002, USA</p>

      </div>
      <div className="col-lg-3 col-md-3 col-sm-12 px-5">
          <h3 className="text-start footer-h3 py-3">Find Us</h3>
          <p className="text-start foot-bt-pad">- Facebook</p>
          <p className="text-start foot-bt-pad">- Twitter</p>
          <p className="text-start foot-bt-pad">- Instagram</p>

      </div>
      <div className='col-lg-1 col-md-1'></div>

  </div>
<hr style={{width:'100%'}} className="mt-5"/>

<div className="row py-3 foot-terms">
    <div className='col-lg-1 col-md-1'></div>
      <div style={{ paddingLeft: '0' }} className="col-lg-4 col-md-4 col-sm-12">
      
      <p className='float-start foot-lt-pad' >&#169; All rights reserved to the great Indian shadi.com</p>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-12">
       
      </div>
      <div className="col-lg-3 col-md-3 col-sm-12">
          <p className=' float-end foot-lt-pad' >Privacy Policy - Terms & Condition</p>
      </div>
      <div style={{ padding: '0' }} className='col-lg-1 col-md-1'></div>

  </div>
</div>
</>
)
}

export default Footer;