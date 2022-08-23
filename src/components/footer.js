import React, { useState } from 'react';
import './footer.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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
      <div className="col-lg-6 col-md-6 col-sm-12 px-3">
      <h3 className="text-start">Newsletter</h3>
      <p className="text-start">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took </p>
      
     <form onSubmit={(event) => event.preventDefault()}>
      <div className="row row-no-gutters">
          <div className="col input-group ">
          <input type="text"  placeholder="Enter Your Email" onChange={(event) => setEmail(event.target.value)} className="form-control"/>
           
          </div>
          <div className="col ">
           <button className="btn btn-primary" onClick={checkEmail}>GET IN TOUCH</button>
          </div>
    </div>
    </form>
    
      </div>
      <div className="col-lg-3 col-md-3 col-sm-12 px-3">
          <h3 className="text-start">HIt Us Up</h3>
          <p className="text-start">123 NhF Lorem Ipsum has been the industry's </p>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-12 px-3">
          <h3 className="text-start">FindUs</h3>
          <p className="text-start">In publishing and graphic design, Lorem ipsum is a placeholder text commonly </p>
      </div>
  </div>
<hr style={{width:'100%'}} className="mt-5"/>

<div className="row">
      <div className="col-lg-4 col-md-4 col-sm-12">
      
      <p >All rights reserved to the great Indian shadi.com</p>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-12">
       
      </div>
      <div className="col-lg-4 col-md-4 col-sm-12">
          <p >Privacy Policy Terms & Condition</p>
      </div>
  </div>
</div>
</>
)
}

export default Footer;