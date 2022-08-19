import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import { Link,useNavigate,useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {FacebookShareButton, FacebookIcon, WhatsappIcon, WhatsappShareButton} from 'react-share';


function IndiBlog() {
    const [showShare, setShowShare] = useState(false)
    const navigate = useNavigate
    const getDate = time => {
        let d = new Date(time);
        return d.getDate() +
            "/" + (d.getMonth() + 1) +
            "/" + d.getFullYear()
    }
      const [blog, setBlog] = useState([]);

      const { id } = useParams();
      console.log("id",id)
      const baseUrl = "http://146.190.30.14:8090/";
    
      useEffect(() => {
        if(id) getBlog(`http://146.190.30.14:8090/api/v1/blog/${id}`)
      }, [])
      const getBlog = (url) => axios({
        method: 'GET',
        url,
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then((resp) => {
        if (resp.statusText == "OK") {
          if (resp.data.status == 'error') toast.error(resp.data.message, {});
          setBlog(resp.data.data);
        } else {
    
        }
      })
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-9 p-5">
                    <img src={baseUrl+blog.thumbnailUrl} alt="banner" className="img-fluid" width="100%" />
                    <div className="d-flex py-3">
                        <div className="col-md-6"><i className="fa fa-user-circle" aria-hidden="true">
                            <span style={{lineHeight: '2px', paddingLeft: '10px', fontSize: '12px' }}>{blog.author ? blog.author : 'Admin'} - <span style={{color:'#7a7c7e'}}>{getDate(blog.createTime)}</span></span>
                        </i></div>
                        <div className="col-md-6 text-end"><span style={{color:'#7a7c7e'}}></span>
                            <img src="/pic/share.png" alt="loccationn" style={{cursor:'pointer'}} className="img-fluid " width="15px" onClick={() => setShowShare(!showShare)}/>
                            {showShare  && <div class="share-container">
                  <FacebookShareButton url={`http://146.190.30.14:8090/blog/${blog._id}`}><FacebookIcon>Facebook</FacebookIcon></FacebookShareButton>
                  <WhatsappShareButton>
                    <WhatsappIcon url={`http://146.190.30.14:8090/blog/${blog._id}`}>Whatsapp</WhatsappIcon></WhatsappShareButton>
                  
                  </div>}
                        </div>
                    </div>
                    <hr style={{ margin: '0 0'}} width="100%" />
                    <h1 class="pt-5 pb-3">{blog.title}</h1>
                    <p style={{ lineHeight: '1.75', fontWeight: '500', color: '#555555' }}>{blog.short}</p>

                    <div className="imtext ps-5 py-5">
                        <img src="/images/individual-blog/vector.png" alt="loccationn" className="img-fluid " />
                        <p className="py-4" style={{fontSize:'18px'}} >“{blog.quote}”</p>
                        <h5 style={{ fontWeight: '500' }}><strong>{blog.author}</strong> </h5>
                    </div>

                    <img src={baseUrl+blog.subImg}  alt="banner" className="img-fluid py-5" width="100%" />
                    <p style={{ lineHeight: '1.75', fontWeight: '500', color: '#555555' }}>{blog.description}</p>

                        {/* <div className="d-flex bg-light py-5 my-5">
                            <div className="col-md-3">
                                <center><img src="/images/individual-blog/img.png" alt="loccationn" className="img-fluid" /></center>
                            </div>
                            <div className="col-md-9">
                                


                            </div>


                        </div> */}
                        {/* <div className="d-flex  my-5">
                            <div className="col-md-6 pe-5">
                                <img src="/images/individual-blog/arrow 2.png" alt="loccationn" className="img-fluid " /> <span>PREV</span>
                                    <p><b>Popular tricks for your wedding day ceremony</b></p>
                            </div>
                            <div className="vl"></div>
                            <div className="col-md-6 text-end ps-5">
                                <b style={{letterSpacing: '2px'}}>NEXT</b>
                                <img src="/images/individual-blog/arrow 1.png" alt="loccationn" className="img-fluid " />
                                    <p><b>The best locations to have an amazing photos</b></p>

                            </div>


                        </div> */}
{/* 
                        <h2>Comments (3)</h2>
                        <div className="d-flex  mt-5">

                            <div className="col-md-4">
                                <img src="/images/individual-blog/rv2.png" alt="loccationn" className="img-fluid" />
                                    <span><b>Kelly Firson</b> - Jul 19, 2020</span>
                            </div>
                            <div className="col-md-8 text-end">
                                <b> REPLY</b>
                            </div>
                        </div>
                        <p className="pt-3">I am grateful to the employees of Joolie for the quality products that I have been using for more than a year, try to work at this level in the future. Thank you!</p>
                        <hr width="100%" />

                        <div className="d-flex  mt-5 ">

                            <div className="col-md-5 ps-5">
                                <img src="/images/individual-blog/rv.png" alt="loccationn" className="img-fluid" />
                                    <span><b>Kelly Firson</b> - Jul 19, 2020</span>
                            </div>
                            <div className="col-md-7 text-end">
                                <b> REPLY</b>
                            </div>
                        </div>
                        <p className="pt-3 p-5">I am grateful to the employees of Joolie for the quality products that I have been using for more than a year, try to work at this level in the future. Thank you!</p>
                        <hr width="100%" />

                        <div className="d-flex  mt-5">

                            <div className="col-md-4">
                                <img src="/images/individual-blog/rv3.png" alt="loccationn" className="img-fluid" />
                                    <span><b>Kelly Firson</b> - Jul 19, 2020</span>
                            </div>
                            <div className="col-md-8 text-end">
                                <b> REPLY</b>
                            </div>
                        </div>
                        <p className="pt-3">I am grateful to the employees of Joolie for the quality products that I have been using for more than a year, try to work at this level in the future. Thank you!</p>
                        <hr width="100%" />

                        <h2 className="pt-5">Leave A Reply</h2>
                        <p>Leave your comment it is very important for us to know your opinion.</p>
                        <form className="py-3">
                            <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control botm" placeholder="Enter your name" name="name"/>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control botm" placeholder="Enter your email" name="email"/>
                                </div>
                            </div>
                            <textarea className="form-control mt-5 botm" rows="5" id="comment" name="text" placeholder="Enter your message"></textarea>
                            <button type="submit" className="btn btn-primary btsk mt-5">Post A Comment</button>
                        </form> */}

                </div>

                <div className="col-md-3 ps-4 ">
                    {/* <form action="/action_page.php text-center">
                        <input type="text" placeholder="Search.." name="search" className="brnone1"/>
                            <button type="submit" className="brnone1"><i className="fa fa-search"></i></button>
                    </form>
                    <hr className="brnone"/>
                        <div className="bggray text-center  py-5">
                            <span>
                                <img src="/images/individual-blog/auth.png" alt="auther" className="img-fluid"/>
                            </span>
                            <h3 className="pecialcl">Luis Faboritti</h3>
                            <p className="pb-2">CEO at TGIS</p>
                            <img src="/images/individual-blog/fb.png" alt="auther" className="img-fluid"/>
                                <img src="/images/individual-blog/tw.png" alt="auther" className="img-fluid"/>
                                    <img src="/images/individual-blog/inst.png" alt="auther" className="img-fluid"/>
                                    </div> */}


                                    <h2 className="pt-4">Categories</h2>
                                    <div className="dashed">
                                        <Link to="/blogs" style={{ fontSize: '12px', fontWeight: '500', cursor: 'pointer',display: 'block', color:'#888888', marginBottom: '5px'}}>-  Stories</Link>
                                        <Link to="/blogs" style={{ fontSize: '12px', fontWeight: '500', cursor: 'pointer',display: 'block', color:'#888888', marginBottom: '5px'}}>-  Wedding Ceremony</Link>
                                        <Link to="/blogs" style={{ fontSize: '12px', fontWeight: '500', cursor: 'pointer',display: 'block', color:'#888888', marginBottom: '5px'}}>-  Bride and Groom</Link>
                                        <Link to="/blogs" style={{ fontSize: '12px', fontWeight: '500', cursor: 'pointer',display: 'block', color:'#888888', marginBottom: '5px'}}>-  Sale & Gifts</Link>
                                        <Link to="/blogs" style={{ fontSize: '12px', fontWeight: '500', cursor: 'pointer',display: 'block', color:'#888888', marginBottom: '5px'}}>-  Accessories</Link>
                                        <Link to="/blogs" style={{ fontSize: '12px', fontWeight: '500', cursor: 'pointer',display: 'block', color:'#888888', marginBottom: '5px'}}>-  Decorations</Link>
                                        <Link to="/blogs" style={{ fontSize: '12px', fontWeight: '500', cursor: 'pointer',display: 'block', color:'#888888', marginBottom: '5px'}}>-  Jewellery</Link>


                                    </div>

                                    {/* <h2 className="pt-4">Recent News</h2>
                                    <div className="news">
                                        <span>
                                            <img src="/images/individual-blog/dummy.png" alt="auther" className="img-fluid py-3"/>
                                        </span>
                                        <p className="pb-2">How to prepare everything on the high level</p>
                                    </div>

                                    <div className="news">
                                        <span>
                                            <img src="/images/individual-blog/dummy.png" alt="auther" className="img-fluid py-3"/>
                                        </span>
                                        <p className="pb-2">The most important things when you choose the flowers</p>
                                    </div> */}

                                    <h2 style={{ fontSize: '25px' }} className="pt-4 pb-2">Tags</h2>
                                    <div className="row">
                                    {blog.tags && blog.tags.map(item => <div className="col-md-4">
                                            <p style={{ color: '#888888', fontSize: '12px', fontWeight: '500' }}>#{item}</p>
                                        </div>
                                    )}
                                    </div>
{/* 
                                        <div className="col-md-4">
                                            <p> #bride</p>
                                            <p>#groom</p>
                                            <p>#photo</p>

                                        </div>

                                        <div className="col-md-4">
                                            <p>#decoration</p>
                                            <p>#jewelry</p>
                                            <p>#ceremony</p>

                                        </div> */}
                                    </div>
                                

                        </div>
                </div>
                )
}
                export default IndiBlog;