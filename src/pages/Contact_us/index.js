import React,{useState,useRef} from 'react';
import './index.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function ContactUs() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  

  const contactUs = () => {
    
    let url = 'http://146.190.30.14:8090/api/v1/contact-us';
    axios({
      method: 'POST',
      url,
      headers: {
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      data: {
        name,
        email,
        message
      }
    }).then((resp) => {
      if(resp.status = 'success') {
        toast("Contact Message Sent")
        ref1.current.value = '';
        ref2.current.value = '';
        ref3.current.value = '';
      }
    })
  }

    return(
        <>
        <ToastContainer
                position="top-right"
                autoClose={5000}
                />
        <div className="container-fluid  boximgages" style={{backgroundImage: 'url("pic/contact/banner.png")'}} >
  <div className="row">
    <div className="clo-lg-12 col-md-12 col-sm-12">
    
      <h1 className="banner-text text-white text-center">Contact Us</h1>
    </div>

  </div>
</div>

<div className="container py-5" >
  <div className="row justfy-content-center">
    <div className="col-md-3">
        <img src="pic/contact/h.png" alt="" className="img-fluid pb-4"/>
        <h3 style={{fontSize:'24px', fontWeight:'500'}}>Company</h3>
        <p style={{color:'#555555'}}>Wedding store “TGIS”<br/>
        <span style={{color:'#EC9DAB'}}>info@sitename.com</span></p>
    </div>
    <div className="col-md-3">
       <img src="pic/contact/location.png" alt="" className="img-fluid pb-4"/>
        <h3 style={{fontSize:'24px', fontWeight:'500'}}>Location</h3>
        <p style={{color:'#555555'}}>27 Division St, New York,
         NY 10002, USA</p>
    </div>
    <div className="col-md-3">
        <img src="pic/contact/phone.png" alt="" className="img-fluid pb-4"/>
        <h3 style={{fontSize:'24px', fontWeight:'500'}}>Phone</h3>
        <p style={{color:'#555555'}}>+1 800 452 78 87<br/>
         +1 800 453 83 12</p>
    </div>
    <div className="col-md-3">
        <img src="pic/contact/watch.png" alt="" className="img-fluid pb-4"/>
        <h3 style={{fontSize:'24px', fontWeight:'500'}}>Hours of Work</h3>
        <p style={{color:'#555555'}}>Mon - Fri: 9 am - 6 pm<br/>
         Sat - Sun: Holiday</p>
    </div>
  </div>
</div>

<div className="container py-5" style={{position: 'relative'}}>
  <div className="row">
    <div className="col-md-7">
        <p style={{color: '#ffabc4'}}><img src="pic/icon/icon.png" alt="logo"/> BE IN TOUCH</p>
        <h2>Send Us A Message</h2>
        <p style={{color:'#555555', fontWeight: '600'}}>We’re always ready to help and make your wedding better.</p>
        <form className="py-3" onSubmit={(event) => event.preventDefault()}>
        <div className="row">
         <div className="col">
         <input type="text" ref={ref1} className="form-control botm" placeholder="Enter your name"  onChange={(e) => setName(e.target.value)} required name="name"/>
        </div>
        <div className="col">
        <input type="text" className="form-control botm" placeholder="Enter your email" ref={ref2} onChange={(e) => setEmail(e.target.value)} required name="email"/>
    </div>
  </div>
      <textarea className="form-control mt-5 botm" rows="5" id="comment" name="text" ref={ref3} onChange={(e) => setMessage(e.target.value)} required placeholder="Enter your message"></textarea>
      <button className="btn btn-primary btsk mt-5" onClick={contactUs}>Send</button>
</form>
    </div>
    {/* <div className="col-md-4 overflowscl " >
        <p style={{color: '#ffabc4'}}><img src="pic/icon/icon.png" alt="logo"/>MEGA SALE 2020</p>
        <h2>
        Hurry Up To<br/>
        Get Your Gift
        </h2>
        <div className="d-flex">
            <div  className="col">
            <h2>10</h2>
            <p>days</p>
            </div>
            <div  className="col">
            <h2>04</h2>
            <p>hours</p>
            </div>
            <div  className="col">
            <h2 style={{color: '#EC9DAB'}}>38 :</h2>
            <p>mins</p>
            </div>
        
            <div  className="col">
            <h2 style={{color: '#EC9DAB'}}>15</h2>
            <p>sec</p>
            </div>
        </div>
        <button type="submit" className="btn btn-primary btsk mt-5">Read All Blogs</button>
        
    </div> */}
  </div>
</div>

<div className="container-fluid banner2img" style={{backgroundImage: 'url("pic/contact/banner2.png")'}} >
  <div className="row">
  </div>
</div></>
    )
}

export default ContactUs;