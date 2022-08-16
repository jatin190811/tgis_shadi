import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import Carousel from 'carousel-react-rcdev';
import {FacebookShareButton, FacebookIcon, WhatsappIcon, WhatsappShareButton} from 'react-share';



function Home() {
    const [categories, setCatgories] = useState([]);
    const [showShare, setShowShare] = useState(false)
    const [inHouse, setinHouse] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [testimonial, setTestimonial] = useState([]);
    const [test, setTest] = useState({});
    const [showIndex, setShowIndex] = useState(null);
    const [venues, setVenues] = useState([]);
    const [like, setLike] = useState([]);
    const images = ["pic/b1.png", "pic/b2.jpg", "pic/ba3.jpg"];
    const [image, setImage] = useState(images[0]);
    const [likeItem, setLikeItem] = useState({});
    const navigate = useNavigate();


    const getDate = time => {
        let d = new Date(time);
        return d.getDate() +
            "/" + (d.getMonth() + 1) +
            "/" + d.getFullYear()
    }

    useEffect(() => {
        getData('http://146.190.30.14:8090/api/v1/categories/popular');
        getHouseCategories('http://146.190.30.14:8090/api/v1/inhouse');
        getVendors('http://146.190.30.14:8090/api/v1/vendors');
        getBlogs('http://146.190.30.14:8090/api/v1/blogs');
        getVenues('http://146.190.30.14:8090/api/v1/venues');
        getTestimonials('http://146.190.30.14:8090/api/v1/testimonials')


    }, [])

    const baseUrl = "http://146.190.30.14:8090/";
    const getData = (url) => axios({
        method: 'GET',
        url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then((resp) => {
        if (resp.statusText == "OK") {
            if (resp.data.status == 'error') toast.error(resp.data.message, {});
            setCatgories(resp.data.data);
        } else {

        }
    })

    const getHouseCategories = (url) => axios({
        method: 'GET',
        url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then((resp) => {
        if (resp.statusText == "OK") {
            if (resp.data.status == 'error') toast.error(resp.data.message, {});
            setinHouse(resp.data.data);
        } else {

        }
    })

    const setFav = (item,index) => {
        let token = localStorage.getItem('token');
        if (token && !item.liked) {  // todo 
          
            let url = 'http://146.190.30.14:8090/api/v1/like';
            axios({
                method: 'POST',
                url,
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': token
                },
                data: {
                    pid: item._id,
                    type: 'venue'
                }
            }).then((resp) => {
                
               getVenues('http://146.190.30.14:8090/api/v1/venues');
            })
        }
        else if (token && item.liked) {
            let url = 'http://146.190.30.14:8090/api/v1/unlike';
            axios({
                method: 'POST',
                url,
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': token
                },
                data: {
                    pid: item._id,
                    type: 'venue'
                }
            }).then((resp) => {
               getVenues('http://146.190.30.14:8090/api/v1/venues');
            })
        }
        else {
            navigate('/login')
        }
    }


    const getTestimonials = (url) => axios({
        method: 'GET',
        url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then((resp) => {
        if (resp.statusText == "OK") {
            if (resp.data.status == 'error') toast.error(resp.data.message, {});
            setTestimonial(resp.data.data);
            setTest(resp.data.data[0])
        } else {

        }
    })


    const getVenues = (url) => axios({
        method: 'POST',
        url,
        headers: {
            'x-access-token' : localStorage.getItem('token') ? localStorage.getItem('token') : '',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then((resp) => {
        if (resp.statusText == "OK") {
            if (resp.data.status == 'error') toast.error(resp.data.message, {});
            setVenues(resp.data.data);
            //helperServices.updateLike(venues);
        } else {

        }
    })
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

    const getVendors = (url) => axios({
        method: 'GET',
        url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then((resp) => {
        if (resp.statusText == "OK") {
            if (resp.data.status == 'error') toast.error(resp.data.message, {});
            setVendors(resp.data.data);
        } else {

        }
    })

    const getInhouse = (url) => axios({
        method: 'GET',
        url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then((resp) => {
        if (resp.statusText == "OK") {
            if (resp.data.status == 'error') toast.error(resp.data.message, {});
            setVendors(resp.data.data);
        } else {

        }
    })


    return (

        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
            />
            <div className="container-fluid box-imgages1 pt-5 mb-5" style={{
                backgroundImage: `url(${image})`, width: '1440px',
                height: '818px'
            }} >
                <div className="row py-5 mx-5 " style={{ marginTop: '10rem', marginBottom: '15rem' }}>

                    <div className="col-md-6 col-sm-12">
                        <p style={{ color: '#ffabc4' }}>AN AFFAIR TO REMEMBER</p>
                        <h1 className="text-white">Be Charming<br /> More Than Ever</h1>
                        <p className="text-white">One stop destination for your wedding needs</p>
                    </div>
                    <div className="col-md-6 col-sm-12"></div>
                </div>
                <div className="row mt-5 mx-5 pb-5 ">
                    <div className="col-md-4 pic-num">
                        <span onClick={() => setImage(images[0])} style={{ color: image == images[0] ? '#f180ab' : '#ffffff', cursor: 'pointer' }}>-01</span>
                        <span onClick={() => setImage(images[1])} style={{ color: image == images[1] ? '#f180ab' : '#ffffff', cursor: 'pointer' }}>-02</span>
                        <span onClick={() => setImage(images[2])} style={{ color: image == images[2] ? '#f180ab' : '#ffffff', cursor: 'pointer' }}>-03</span>

                    </div>

                    <div className="col-md-4 text-center">
                        <img src="pic/m.png" alt="mouse" className="img-fluid" />
                    </div>
                    {/* <div className="col-md-4">
                        <img src="pic/arrows.png" alt="arrows" className="img-fluid float-end" />

                    </div> */}
                </div>
            </div>

            <div className="container-fluid py-5"  >
                <div className="row">
                    <div className="col 12 text-center">
                        <h2>Wedding Safety</h2>
                        <p>Cupidatat ad in qui est aliqua consectetur incididunt irure. <br />
                            Nostrud magna anim officia ad labore.</p>
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col 3">
                        <div className="card  text-dark">
                            <div className="card-body blur">
                                <img src="pic/icon/4.png" alt="logo" className="blurimg" />
                                <span className="blurtext"><h4>Protective Gears</h4>
                                    <p>Routine use of masks, gloves and sanitizers.</p>
                                </span>


                            </div>
                        </div>
                    </div>

                    <div className="col 3">
                        <div className="card  text-dark">
                            <div className="card-body blur">
                                <img src="pic/icon/3.png" alt="logo" className="blurimg" />
                                <span className="blurtext"><h4>Protective Gears</h4>
                                    <p>Routine use of masks, gloves and sanitizers.</p>
                                </span>


                            </div>
                        </div>
                    </div>

                    <div className="col 3">
                        <div className="card  text-dark">
                            <div className="card-body blur">
                                <img src="pic/icon/2.png" alt="logo" className="blurimg" />
                                <span className="blurtext"><h4>Protective Gears</h4>
                                    <p>Routine use of masks, gloves and sanitizers.</p>
                                </span>


                            </div>
                        </div>
                    </div>

                    <div className="col 3">
                        <div className="card  text-dark">
                            <div className="card-body blur">
                                <img src="pic/icon/1.png" alt="logo" className="blurimg" />
                                <span className="blurtext"><h4>Protective Gears</h4>
                                    <p>Routine use of masks, gloves and sanitizers.</p>
                                </span>


                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div className="container-fluid py-5" >
                <div className="row">
                    <div className="col 12 text-center">
                        <p style={{ color: '#ffabc4' }}>GET YOUR <img src="pic/icon/icon.png" alt="logo" />CHANCE</p>
                        <h2>Popular Categories to Choose From</h2>
                        <p>Cupidatat ad in qui est aliqua consectetur incididunt irure. <br />
                            Nostrud magna anim officia ad labore.</p>
                    </div>
                </div>

                <div className="row justify-content-center g-4 p-5">
                    {categories && categories.length && <Carousel>
                        {categories && categories.length && categories.map(item => (<div className="col-md-3 p-3">
                            <div className="card justify-items-center ">
                                <div className="cat-img">

                                    <Link to={`list${item.url}`}>
                                        <img src={baseUrl + item.image} width="270" height="350" className="card-img-top img-fluid category-img" /></Link>

                                </div>
                                <div className="card-img-overlays ">
                                    {item && item.tag?.length && <button type="button" className="btn btn-primary round">{item.tag[0]}</button>}
                                </div>
                                <h4 className="" style={{ paddingTop: '1rem', textTransform: 'capitalize' }}>{item.name}</h4>
                                <img src="/pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" />
                                <span className="add-pop">{item.address}</span>
                            </div>
                        </div>))}
                    </Carousel>}
                </div >

                <div className="row">
                    <div className="col ">
                        <div className="text-center">
                            <button className="btn btsk" onClick={() => navigate("/category")}><i className="fa fa-th-large" aria-hidden="true"></i> &nbsp; &nbsp;Explore Categories</button>
                        </div>
                    </div>
                </div>
            </div >

            <div className="container-fluid py-5">
                <div className="row">
                    <div className="col 12 text-center">
                        <h2>Featured Vendor</h2>
                        <p>Cupidatat ad in qui est aliqua consectetur incididunt irure. <br />
                            Nostrud magna anim officia ad labore.</p>
                    </div>
                </div>
                <div className="row g-4 p-3">
                    {vendors && vendors.length && <Carousel>
                        {vendors && vendors.length && vendors.filter(item => item.isFeatured).map(item => <div className="col-md-3 vendor-card">
                            <div className="card p-3 ">
                                <div className="" >
                                    {item?.images?.length && item.images[0] ?
                                        <img src={baseUrl + item.images[0]} style={{ width: '364px', height: '332px' }} className="img-fluid vendor-img" /> : ""}
                                </div>
                                {<div className="card-img-overlay ">
                                    <i className="fas fa-star-half-alt" style={{ float: 'right', marginRight: '20px' }}>{item?.avgRating ? item?.avgRating : 0}</i>
                                </div>}
                            </div>
                            <div style={{
                                position: 'relative',
                                left: '20px'
                            }}>
                                {item.name ? <h4 className="pt-3"><b>{item.name}</b></h4> : ''}
                                <img src="/pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" />
                                <span className="add-text">{item.address}</span>
                                {item.price ? <p className=" pt-0" style={{ marginTop: '20px', color: 'rgb(241, 128, 171)' }}>{item.price}</p> : ''}
                            </div>
                        </div>)}
                    </Carousel>}
                </div >
            </div >

            <div className="container-fluid mybg py-5 " style={{ backgroundImage: 'url("pic/mybg.png")' }}>
                <div className="row   ">
                    <div className="col-lg-6 col-md-6 col-sm-12  gx-lg-5 p-lg-5 ">
                        <div className="align-items-center justify-content-center ">
                            <p style={{ color: '#ffabc4' }}><img src="pic/icon/icon.png" alt="logo" />
                                FIND YOUR BEAUTY</p>
                            <h2>We Work Hard for<br /> Your Happy Moment</h2>
                            <h3 className="py-3">WE know that a reader will be distracted by
                                the readable content of a page when looking at its layout</h3>
                            <p>It is a long established fact that a reader will be distracted by
                                the readable content of a page when looking at its layout.
                                It is a long established fact that a reader will be distracted by
                                the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by
                                the readable content of a page when looking at its layout.
                                It is a long established fact that a reader will be distracted by
                                the readable content of a page when looking at its layout.
                                It is a long established fact that a reader will be distracted by
                                the readable content of a page when looking at its layout.
                                It is a long established fact that a reader will be distracted by
                                the readable content of a page when looking at its layout.
                                It is a long established fact that a reader will be distracted by
                                the readable content of a page when looking at its layout.
                                It is a long established fact that a reader will be distracted by
                                the readable content of a page when looking at its layout. </p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12  gx-lg-5 py-5">
                        <iframe width="650" height="400" src="https://www.youtube.com/embed/ymZp5jkgeME" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                    </div>
                </div>
            </div>

            <div className="container py-5 mx-auto" >
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p style={{ color: '#ffabc4' }}>INHOUSE <img src="pic/icon/icon.png" alt="logo" />
                            SERVICES</p>
                        <h2>TGIS In House Services</h2>
                    </div>

                    {inHouse && inHouse.length && inHouse.map(item => <div className="col-md-6 col-sm-12 pt-5">

                        <Link to={`${item.url}/inhouse`} params={{ inhouse: 'true' }}>
                            <img src={baseUrl + item.image} alt="venue" className="img-fluid px-3 inhouse-img" />
                        </Link>
                        <h4 className="text-center py-3 " style={{ fontSize: '26px', fontWeight: '400' }}>{item.name}</h4>
                        {/* <img src="/pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" />
              <span className="add-text">{item.address}</span> */}
                    </div>)}
                </div>

            </div>

            <div className="container mt-5">
                <div className="row">

                    <div className="col-md-12 text-center pt-5 pb-4">
                        <p style={{ color: '#ffabc4' }}>GET YOUR <img src="pic/icon/icon.png" alt="logo" />
                            CHANCE</p>
                        <h2>Expore Excuisite Venues</h2>
                        <p>It is a long established fact that a reader will be distracted<br /> by the readable content of a page </p>
                    </div>
                    {venues && venues.filter(item => item.execuisite).map((item,index) => <div className="col-md-4 col-sm-12 px-3">
                        <div className="card mycd">

                            <Link to={"/venue/" + item._id}>
                                <div className="card-img">

                                    {item?.images?.length && <img src={baseUrl + item.images[0]} className="exc-img img-fluid" />}
                                </div>

                            </Link>
                            <div className="card-img-overlays ">

                            </div>

                            <div className="like-section" >
                                <span onClick={() => {
                                    setFav(item,index)
                                    }}><img src={(item.liked) ? 'pic/icon/fav.png' : 'pic/icon/h.png'} alt="loccationn" className="img-fluid " width="20px" style={{ float: 'right', position: 'relative', right: '29%' }} /></span>
                                <h4 className="py-2">{item.name}</h4>
                                <img src="/pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" />
                                <span className="add-text">{item.address}</span>
                            </div>
                        </div>
                    </div>)}

                    {/* <div className="col-md-4 col-sm-12 px-3">

            <div className="card mycd">
              <a href="http://">
                <div className="card-img">
                  <img src="pic/c.png" className="img-fluid" />
                </div>
              </a>
              <div className="card-img-overlays ">

              </div>
              <div className="text-right myf">
                <img src="pic/icon/h.png" alt="loccationn" className="img-fluid " width="20px" />
              </div>
              <h4 className="py-2">Hotel Maharaja</h4>
              <span style={{ lineHeight: '2px' }}>New Delhi</span>
            </div >
          </div >

          <div className="col-md-4 col-sm-12 px-3">

            <div className="card mycd">
              <a href="http://">
                <div className="card-img">
                  <img src="pic/c.png" className="img-fluid" />
                </div>
              </a>
              <div className="card-img-overlays ">
              </div>
              <div className="text-right myf">
                <img src="pic/icon/h.png" alt="loccationn" className="img-fluid " width="20px" />
              </div>
              <h4 className="py-2">Hotel Amar Vilas</h4>
              <span style={{
                lineHeight: '2px'
              }}> Agra</span >
            </div >
          </div > */}
                </div >
            </div >


            <div className="container-fluid my-5 imgbog" style={{ backgroundImage: 'url("pic/banner.png")' }}>
                <div className="row">

                    <div className="col-md-12 text-center py-5">
                        <p style={{ color: '#ffabc4' }}>OUR  <img src="pic/icon/icon.png" alt="logo" />
                            BLOG</p>
                        <h2>The Latest In TGIS</h2>
                    </div>
                    {blogs && blogs.slice(3, blogs.length).map((item,index) => <div className="col-md-4 col-sm-12 px-3">
                        <div className="card" style={{ paddingRight: '15px' }}>

                            <Link to={"/blog/" + item._id}>
                                <img src={baseUrl + item.thumbnailUrl} className="img-fluid blog-img" />
                            </Link>

                            <div className="card-img-overlays ">

                            </div>
                            <div className="d-flex  text-center py-2">
                                <div className="col-md-4"><i className="fa fa-user-circle" style={{ float: 'left' }} aria-hidden="true">
                                    <span style={{ lineHeight: '2px' }}>{item.createdBy ? item.createdBy : 'Admin'}</span>
                                </i></div>
                                <div className="col-md-4">-{getDate(item.createTime)}</div>
                                <div className="col-md-4">
                                    <img src="pic/share.png" alt="loccation" className="img-fluid " style={{cursor: 'pointer'}}  onClick={(event) => {
                                        
                                            setShowShare(!showShare)
                                            setShowIndex(index)
                                       
                                    }} width="20px" />
                                    {showShare && showIndex == index && <div class="share-container">
                                        <FacebookShareButton url={`http://146.190.30.14:8090/blog/${item._id}`}><FacebookIcon>Facebook</FacebookIcon></FacebookShareButton>
                                        <WhatsappShareButton url={`http://146.190.30.14:8090/blog/${item._id}`}>
                                            <WhatsappIcon >Whatsapp</WhatsappIcon></WhatsappShareButton>

                                    </div>}
                                </div>
                            </div>
                            <hr width="93%" />
                            <span class="blog-title">{item.title}</span>

                        </div>
                    </div>)}

                    {/* <div className="col-md-4 col-sm-12 px-3">

            <div className="card">
              <a href="http://">
                <div className="card-img">
                  <img src="pic/bg2.png" className="img-fluid" />
                </div>
              </a>
              <div className="card-img-overlays ">

              </div>
              <div className="d-flex  text-center py-2">
                <div className="col-md-4"><i className="fa fa-user-circle" aria-hidden="true">
                  <span style={{ lineHeight: '2px' }}>Mary Lanoris</span>
                </i></div>
                <div className="col-md-4">-Sap 20, 2020</div>
                <div className="col-md-4">
                  <img src="pic/share.png" alt="loccationn" className="img-fluid " width="20px" />
                </div>
              </div>
              <hr width="93%" />
              <h4>How to Prepare Everthing On The Hiegh Level</h4>
            </div>
          </div>

          <div className="col-md-4 col-sm-12 px-3">

            <div className="card gx-5">
              <a href="">
                <div className="card-img">
                  <img src="pic/bg3.png" className="img-fluid" />
                </div>
              </a>
              <div className="card-img-overlays ">
              </div>
              <div className="d-flex  text-center py-2">
                <div className="col-md-4"><i className="fa fa-user-circle" aria-hidden="true">
                  <span style={{ lineHeight: '2px' }}>Mary Lanoris</span>
                </i></div>
                <div className="col-md-4">-Sap 20, 2020</div>
                <div className="col-md-4">
                  <img src="pic/share.png" alt="loccationn" className="img-fluid " width="20px" />
                </div>
              </div>
              <hr width="93%" />
              <h4>How to Prepare Everthing On The Hiegh Level</h4>

            </div>
          </div > */}
                </div >
                <div className="row">
                    <div className="col-md-12 text-center mt-5">
                        <button type="submit" className="text-white button btn btsk my-3" onClick={() => navigate("/blogs")}>Read All Blogs</button>

                    </div>
                </div>
            </div >

            {testimonial && <div className="container" style={{
                backgroundImage: 'url("pic/tb.png")',
                backgroundSize: 'cover', backgroundPosition: 'center'
            }}>
                <div className="row">

                    <div className="col-md-12 text-center  pb-4">
                        <p style={{ color: '#ffabc4' }}>CLIENT <img src="pic/icon/icon.png" alt="logo" />
                            SPEAK</p>
                        <h2>Testimonials</h2>
                        <p>It is a long established fact that a reader will be distracted<br /> by the readable content of a page </p>
                    </div>

                    <div className="col-md-6">
                        <img src={baseUrl + test.image} className="img-fluid" style={{ minWidth: '546px', minHeight: '645px' }} alt="..." />
                    </div>
                    <div className="col-md-6 testt  p-5">

                        <h3 className="text-center">{test.name}</h3>
                        <div className="align-items-center justify-content-center pt-3">
                            <p className="text-center">
                                {test.testimonials}
                            </p>
                        </div>
                        <div className="navigation text-center pt-5">
                            <span onClick={() => setTest(testimonial[0])} style={{ color: test?.name == testimonial[0]?.name ? '#f180ab' : '#000000', cursor: 'pointer' }}>-01</span>
                            <span onClick={() => setTest(testimonial[1])} style={{ color: test?.name == testimonial[1]?.name ? '#f180ab' : '#000000', cursor: 'pointer' }}>-02</span>
                            <span onClick={() => setTest(testimonial[2])} style={{ color: test?.name == testimonial[2]?.name ? '#f180ab' : '#000000', cursor: 'pointer' }}>-03</span>
                        </div>
                    </div>
                </div>
            </div>}


            <div className="container-fluid my-5  mb-5 " style={{
                backgroundImage: "url('pic/hh.png')",
                backgroundSize: 'cover', backgroundPosition: 'center', padding: '10vh'
            }}>
                <div className="row px-lg-5  align-items-center ">
                    <div className="col-lg-8 col-md-8 col-sm-12 py-5">
                        <h1 className="py-2 lg-display-6">Download The Mobile App Today</h1>
                        <div className="d-flex py-2 col-sm-12 ctc2">
                            <div className="col-lg-6 col-md-6 col-sm-12  text-left">
                                <i className="fa fa-bell" aria-hidden="true">
                                    <span style={{ color: '#f9326e' }}>Get Instant Notification</span>
                                </i>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 text-left">
                                <i className="fa fa-clipboard" aria-hidden="true">
                                    <span style={{ color: '#f9326e' }}>Get Free Wedding checklist</span>
                                </i>
                            </div>
                        </div>
                        <p className="py-3">In publishing and graphic design, Lorem ipsum is a placeholder text
                            commonly</p>
                        <p className="border-bottom">+91 <i className="fas fa-angle-down"></i> 9022222222</p>

                        <div className="d-flex text-left col-sm-12 ctc" >
                            <div className="col-lg-8 col-md-8 col-sm-12 py-3 ">
                                <button className="btn btsk1">
                                    <i className="fa fa-chevron-circle-down" aria-hidden="true"></i> Download The App</button>

                            </div>

                            <div className="col-lg-2 col-md-2 col-sm-6 col-sm-12  py-3 ">
                                <img src="" alt="" sizes="" />
                                <img src="pic/icon/ap.png" alt="" width="60%" className="img-fluid" />
                            </div>

                            <div className="col-lg-2 col-md-2 col-sm-6 col-sm-12  py-3 ">
                                <img src="pic/icon/an.png" alt="" width="60%" className="img-fluid" />

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;