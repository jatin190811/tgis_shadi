import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {FacebookShareButton, FacebookIcon, WhatsappIcon, WhatsappShareButton} from 'react-share';
function Blogs() {
  const [showShare, setShowShare] = useState(false)
  const getDate = time => {
    let d = new Date(time);
    return d.getDate() +
        "/" + (d.getMonth() + 1) +
        "/" + d.getFullYear()
}
  const [blogs, setBlogs] = useState([]);
  const [showIndex, setShowIndex] = useState(null);
  const baseUrl = "http://146.190.30.14:8090/";

  useEffect(() => {
    getBlogs('http://146.190.30.14:8090/api/v1/blogs')
  }, [])
  const getBlogs = (url) => axios({
    method: 'GET',
    url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }).then((resp) => {
    if (resp.statusText == "OK") {
      if (resp.data.status == 'error') toast.error(resp.data.message, {});
      setBlogs(resp.data.data);
    } else {

    }
  })
    return(
        <>
        
<div className="container-fluid  boximgages" style={{backgroundImage: 'url("pic/blog/banner.png")'}} >
  <div className="row">
    <div className="clo-lg-12 col-md-12 col-sm-12">
    
      <h1 className="banner-img text-white text-center">Blogs</h1>
    </div>

  </div>
</div>


<div className="container-fluid">
  <div className="row p-5">

    { blogs && blogs.map((item,index) => <div key={index} className="col-md-4 col-sm-12 px-3">
        <div className="card" style={{marginTop: '30px'}}>
								<div className="">
                <Link to={"/blog/" + item._id}>
                                <img src={baseUrl + item.thumbnailUrl} className="img-fluid blog-img" />
                            </Link>
								</div>

								<div className="card-img-overlays ">

                </div>
                <div className="d-flex  text-center py-2">
                <div className="col-md-4"><i className="fa fa-user-circle" aria-hidden="true" style={{ float: 'left' }}>
                <span style={{lineHeight: '2px'}}>{item.createdBy ? item.createdBy : 'Admin'}</span>
                </i></div>
                <div className="col-md-4">-{getDate(item.createTime)}</div>
                <div className="col-md-4">
                <img src="pic/share.png" alt="loccation" dataAtr={item.title} className="img-fluid " style={{cursor: 'pointer'}} onClick={(event) => {
                  
                  setShowShare(!showShare)
                  setShowIndex(index);
                } }width="20px"/>
                {showShare && showIndex == index && <div class="share-container" >
                  <FacebookShareButton url={`http://146.190.30.14:8090/blog/${item._id}`}><FacebookIcon>Facebook</FacebookIcon></FacebookShareButton>
                  <WhatsappShareButton url={`http://146.190.30.14:8090/blog/${item._id}`}>
                    <WhatsappIcon >Whatsapp</WhatsappIcon></WhatsappShareButton>
                  
                  </div>}
                </div>
                </div>
                <hr width="86%"/>
                <h4 className="blogss-title">{item.title}</h4>
							
					</div>
	</div>)}

    {/* <div className="col-md-4 col-sm-12 px-3">
							   
            <div className="card">
            <a href="http://">
								<div className="card-img">
								<img src="pic/bg2.png" className="img-fluid" width="100%"/>
								</div>
           </a>
								<div className="card-img-overlays ">

                </div>
                <div className="d-flex  text-center py-2">
                <div className="col-md-4"><i className="fa fa-user-circle" aria-hidden="true">
                <span style={{lineHeight: '2px'}}>Mary Lanoris</span>
                </i></div>
                <div className="col-md-4">-sep 20, 2020</div>
                <div className="col-md-4">
                <img src="pic/share.png" alt="loccationn" className="img-fluid " width="20px"/>
                </div>
                </div>
                <hr width="100%"/>
                <h4>How to Prepare Everthing On The Hiegh Level</h4>
					</div>
	</div>

    <div className="col-md-4 col-sm-12 px-3">
							 
            <div className="card gx-5">
              <a href="http://">
								<div className="card-img">
								<img src="pic/bg3.png" className="img-fluid"  width="100%"/>
								</div>
                </a>
								<div className="card-img-overlays ">
								</div>
                <div className="d-flex  text-center py-2">
                <div className="col-md-4"><i className="fa fa-user-circle" aria-hidden="true">
                <span style={{lineHeight: '2px'}}>Mary Lanoris</span>
                </i></div>
                <div className="col-md-4">-sep 20, 2020</div>
                <div className="col-md-4">
                <img src="pic/share.png" alt="loccationn" className="img-fluid " width="20px"/>
                </div>
                </div>
                <hr width="100%"/>
                <h4>How to Prepare Everthing On The Hiegh Level</h4>
               
					</div>
	</div>
 
  </div>
  <div className="row p-5">

    <div className="col-md-4 col-sm-12 px-3">
        <div className="card">
								<div className="card-img">
								<img src="pic/bg1.png" className="img-fluid" width="100%"/>
								</div>
								<div className="card-img-overlays ">

                </div>
                <div className="d-flex  text-center py-2">
                <div className="col-md-4"><i className="fa fa-user-circle" aria-hidden="true">
                <span style={{lineHeight: '2px'}}>Mary Lanoris</span>
                </i></div>
                <div className="col-md-4">-sep 20, 2020</div>
                <div className="col-md-4">
                <img src="pic/share.png" alt="loccationn" className="img-fluid " width="20px"/>
                </div>
                </div>
                <hr width="100%"/>
                <h4>How to Prepare Everthing On The Hiegh Level</h4>
							
					</div>
	</div>

    <div className="col-md-4 col-sm-12 px-3">
							   
            <div className="card">
            <a href="http://">
								<div className="card-img">
								<img src="pic/bg2.png" className="img-fluid" width="100%"/>
								</div>
           </a>
								<div className="card-img-overlays ">

                </div>
                <div className="d-flex  text-center py-2">
                <div className="col-md-4"><i className="fa fa-user-circle" aria-hidden="true">
                <span style={{lineHeight: '2px'}}>Mary Lanoris</span>
                </i></div>
                <div className="col-md-4">-sep 20, 2020</div>
                <div className="col-md-4">
                <img src="pic/share.png" alt="loccationn" className="img-fluid " width="20px"/>
                </div>
                </div>
                <hr width="100%"/>
                <h4>How to Prepare Everthing On The Hiegh Level</h4>
					</div>
	</div>

    <div className="col-md-4 col-sm-12 px-3">
							 
            <div className="card gx-5">
              <a href="http://">
								<div className="card-img">
								<img src="pic/bg3.png" className="img-fluid"  width="100%"/>
								</div>
                </a>
								<div className="card-img-overlays ">
								</div>
                <div className="d-flex  text-center py-2">
                <div className="col-md-4"><i className="fa fa-user-circle" aria-hidden="true">
                <span style={{lineHeight: '2px'}}>Mary Lanoris</span>
                </i></div>
                <div className="col-md-4">-sep 20, 2020</div>
                <div className="col-md-4">
                <img src="pic/share.png" alt="loccationn" className="img-fluid " width="20px"/>
                </div>
                </div>
                <hr width="100%"/>
                <h4>How to Prepare Everthing On The Hiegh Level</h4>
               
					</div>
	</div>
 
  </div> */}
  { blogs.length > 6 && <div className="row">
    <div className="col-md-12 text-center pb-5">
    <button type="submit" className="text-white button btn btsk my-3">Read All Blogs</button>

    </div>
  </div>}
</div>
</div>
        </>
    )
}

export default Blogs;