import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import Carousel from 'carousel-react-rcdev';

//ES5


function Details() {
	const navigate = useNavigate();
	var ToggleButton = require('react-toggle-button')
	let { type, id } = useParams();
	let type1 = type;
	if (type == 'venues')
		type1 = 'venue'
	else if (type == 'makeup')
		type1 = 'bridal-makeup';
	else if (type == 'bridalwear')
		type1 = 'bridal-wear';
	else if (type == 'groomwear')
		type1 = 'groom';
	else if (type == 'mehandi')
		type1 = 'mehndi';
	else if (type == 'photographers')
		type1 = 'photographer';
	else if (type == 'decor')
		type1 = 'planner';
		let arr=[false,false,false,false,false];

	const [details, setDetails] = useState([]);
	const [ratingList, setRatingList] = useState([]);
	const [showContact, setShowContact] = useState(false);
	const [showSendMsg, setShowSendMsg] = useState(false);
	const [toggle, setToggle] = useState(false);
	const [state,setState] = useState({})
	const [istate,setIstate] = useState(0)
	const [msgState,setMsgState] = useState({})
	const [otp,setOtp] = useState();
	const [ref,setRef] = useState();
	const ref1 = useRef();
	const [disableSend, setDisableSend] = useState(false)
	const [isVideo,setIsVideo] = useState(false);
	const [showOtp,setShowOtp] = useState(false)
	const [otpSuccess,setOtpSuccess] = useState(false)
	const [showModal,setShowModal] = useState(false)
	const [feedback,setFeedback] = useState('')
	const [reveiewCount,setReviewCount] = useState(0)
	const [reveiewArray,setReviewArray] = useState(arr)
	const [count,setCount] = useState(0)
	
	const baseUrl = 'http://146.190.30.14:8090/';
	useEffect(() => {
		getData(`http://146.190.30.14:8090/api/v1/${type1}/${id}`)
		getRatingList(`http://146.190.30.14:8090/api/v1/list-rating`)
		window.scrollTo(0,0);
	}, [])

	useEffect(() => {
		getData(`http://146.190.30.14:8090/api/v1/${type1}/${id}`)
		getRatingList(`http://146.190.30.14:8090/api/v1/list-rating`)
		window.scrollTo(0,0);
	}, [type, id])

	const getData = (url) => axios({
		method: 'POST',
		url,
		headers: {
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
		}
	}).then((resp) => {
		if (resp.statusText == "OK") {
			if (resp.data.status == 'error') toast.error(resp.data.message, {});
			setDetails(resp.data.data);
		} else {

		}
	})
	const getRatingList = (url) => axios({
		method: 'POST',
		url,
		headers: {
			'content-type': 'application/json',
			'x-access-token': localStorage.getItem('token')
		},
		data: {pid: id, type: type1}
	}).then((resp) => {
		if (resp.statusText == "OK") {
			if (resp.data.status == 'error') toast.error(resp.data.message, {});
			setRatingList(resp.data.data.reviews);
		} else {

		}
	})
	const sendMessage = () => {
		let url = 'http://146.190.30.14:8090/api/v1/message-us';
		axios({
			method: 'POST',
			url,
			headers: {
				'content-type': 'application/json'
			},
			data : {...state, vid: id, vtype : type, metadata : msgState}
		}).then((resp) => {
			if (resp.statusText == "OK") {
				if (resp.data.status == 'error') toast.error(resp.data.message, {});
				else if(resp.data.status == 'success') {
					setRef(resp.data.data.ref)
					setShowOtp(true)
					setShowSendMsg(false)
				}
			} else {
	
			}
		})
	}

	const setReview = (index) => {
		for(let i=0; i<= index; i++) {
			arr[i] = true;
		} 
		setReviewArray(arr);
		setReviewCount(index+1);
		
	}
	const clearReview = (index) => {
		for(let i=0; i<5 ; i++) {
			arr[i] = false;
		} 
		setReviewArray(arr);
		setReviewCount(0);
		ref1.current.value= '';
		
	}
	const addRating = () => {
		let url = 'http://146.190.30.14:8090/api/v1/add-rating';
		axios({
			method: 'POST',
			url,
			headers: {
				'content-type': 'application/json',
				'x-access-token': localStorage.getItem('token')
			},
			data : {type: type1, pid: details._id, rating: reveiewCount.toString(), review: feedback}
		}).then((resp) => {
			if (resp.statusText == "OK") {
				if (resp.data.status == 'error') toast.error(resp.data.message, {});
				else if(resp.data.status == 'success') {
					clearReview();
					getRatingList(`http://146.190.30.14:8090/api/v1/list-rating`)
				}
			} else {
	
			}
		})
	}

	const verifyOtp = () => {
		let url = 'http://146.190.30.14:8090/api/v1/verify-message'
		axios({
			method: 'POST',
			url,
			headers: {
				'content-type': 'application/json'
			},
			data : {ref, otp}
		}).then((resp) => {
			if (resp.statusText == "OK") {
				if (resp.data.status == 'error') toast.error(resp.data.message, {});
				else if(resp.data.status == 'success') {
					setShowOtp(false)
					setDisableSend(true)
					setOtpSuccess(true)
				}	
			} else {
	
			}
		})
	}
	return (
		<>
		<ToastContainer
                position="top-right"
                autoClose={5000}
            />
			{details && <div className='detail-container'>
				<div className="container ftco-section">
					<div className="row">
						<div className="col-lg-7">
							<div className='pb-3' style={{display: 'flex', alignItems: 'end' }}>
							<div className="col-md-9" style={{textTransform: 'capitalize'}}>
								<h3 class="detail-name pb-3">
									{details.name}
								</h3>
								<p><img src="/images/vector/loction.png" alt="" /> Chanakyapuri, New Delhi</p>
								<p>{details.address}</p>
							</div>
							
							<div className="col-md-3">
								<h3 class="detail-rating">{Math.floor(details.avgRating)}</h3>
								<p style={{ fontSize: '12px', textAlign: 'center' }} className="rate">
									<span>{Array.from({length: details.avgRating}, (_, i) => i + 1).map(item => <img src="/pic/ct/str1.png" alt="star" srcSet="" width="15" className="img-fluid pt-3 star-img" />)}
                {Array.from({length: 5 - (details.avgRating ? details.avgRating : 0)}, (_, i) => i + 1).map(item => <img src="/pic/ct/str2.png" alt="star" srcSet="" width="15" className="img-fluid pt-3 star-img" />)}
										<br />{details?.reviews?.length} reviews</span></p>
							</div>
							</div>
							<div>
							{details && details.images && <img src={baseUrl + details?.images[0]} className="img-rounded" alt="" width="600px" height="450px" />}
						</div>
						</div>
						<div className="col-lg-5 cellpadding">
							<div  className="wbr">
								<p className="hborder">{details?.detailedPrice?.tag3}</p>
								{<p><span style={{ fontSize: '14px', color: 'black', fontWeight: '500' }} >{details?.detailedPrice?.tag1[0]}</span><span style={{ fontSize: '14px', color: 'black', fontWeight: '500' }} className="fright">{details?.detailedPrice?.tag1[1]} {type1 == "venue" && <i className="fa fa-circle fsize green"></i>}</span></p>}
								{<p style={{ fontSize: '14px', color: 'black', fontWeight: '500' }} >Rs {details?.detailedPrice?.tag2[0]}<span style={{ fontSize: '14px', color: 'black', fontWeight: '500' }} className="fright">{details?.detailedPrice?.tag2[1]} {type1 == "venue" && <i className="fa fa-circle fsize red"></i>}</span></p>}
							</div>
							<div className="wbrt">
								<div className="d-flex">
									<button type="button" className="btn btn-outline-primary" style={{ fontSize: '14px', backgroundColor: disableSend ? 'pink' : '', color:  disableSend ? 'white' : '', cursor: disableSend ? 'not-allowed' : '', border: 'none' }} onClick={() => {setShowSendMsg(true)
									setShowContact(false)
									setShowOtp(false)}} disabled={disableSend}>
										<img src="/images/vector/latter.png" className="" alt="" style={{ position: 'relative', top: '2px' }} /> Send Message
									</button>
									<button type="button" className="btn btn-outline-green ml-auto" onClick={() => {setShowContact(true)
									setOtpSuccess(false)
									setShowOtp(false)
									setShowSendMsg(false);
									}} style={{ fontSize: '14px' }}>
										<img src="/images/vector/mobile.png" className="" alt="" style={{ position: 'relative', top: '5px' }} /> View Contact
									</button>
								</div>
								{showContact && <div className='contact-section'>
									<p className="dlgt">Here are the contact details of the vendor</p>
									<div className="d-flex">
										<span className="link">
											<img src="/images/vector/mob_black.png" className="" alt="" /> <a href={`tel:${details?.contact_details?.number}`}>{details?.contact_details?.number}</a>
										</span>
										<span className="ml-auto link">
											<img src="/images/vector/message.png" className="" alt="" /> <a href={`mailto:${details?.contact_details?.email}`}>{details?.contact_details?.email}</a>
										</span>
									</div>
									<div className="textcenter">
										<div action="/action_page.php">
											<input type="checkbox" id="sadi" name="sadi" value="sadi" />
											<label htmlFor="vehicle1"> Allow this vendor to reach me</label>
										</div>
									</div>
								</div>
								}
								 <div className='contact-section'>
								 {showSendMsg && <div>
									<p className="" style={{ marginTop: '20px' }}>Please fill in your details</p>
									<hr style={{ color: '#F180AB', height: '2px' }}></hr>
									<form onSubmit={(event) => event.preventDefault()}>
									<div className="row">
										<div className='col-md-6'><input type="text" placeholder='Enter full name *' required onChange={(event) => setState({...state, name: event.target.value})} /></div>
										<div className='col-md-6'><input type="tel" placeholder='Enter Mobile No' required onChange={(event) => setState({...state, phone: event.target.value})} /></div>
										<div className='col-md-6'><input type="text" placeholder='Email Address *' required onChange={(event) => setState({...state, email: event.target.value})}/></div>
										<div className='col-md-6'><input type="date" placeholder='Function date *' required onChange={(event) => setState({...state, date: event.target.value})}/></div>
										{type == 'venues' && <div className='col-md-6'><input type="number" placeholder='No. of Guests *' required onChange={(event) => setMsgState({...msgState, guests: event.target.value})}/></div>}
										{type == 'venues' && <div className='col-md-6'><input type="number" placeholder='No. of Rooms *' required onChange={(event) => setMsgState({...msgState, rooms: event.target.value})} /></div>}
										{type != 'venues' && <div className='col-md-12'><input type="text" style={{ width: '100%' }} placeholder='Details about my wedding *' onChange={(event) => setState({...state, details: event.target.value})} required /></div>}

									</div>
									<hr style={{ color: '#F180AB', height: '2px' }}></hr>
									<div className="row">

										<div className='col-md-6' style={{marginBottom : '10px'}}>Function Type</div>
										<div className='col-md-6' style={{marginBottom : '10px'}}>Function Type</div>
										<div className='col-md-6' style={{marginBottom : '10px'}}><input type="checkbox" className="form-check-input" id="check1" name="option1" onChange={(event) => {
											setMsgState({...msgState, prewed: state.prewed ? false : true})}} />
											<label className="form-check-label" htmlFor="check1">Pre Wedding</label></div>
										<div className='col-md-6' style={{marginBottom : '10px'}}><input type="checkbox" className="form-check-input" id="check1" name="option1" onChange={(event) => {
											setMsgState({...msgState, evening: state.evening ? false : true})}} />
											<label className="form-check-label" htmlFor="check1">Evening</label></div>
										<div className='col-md-6' style={{marginBottom : '10px'}}><input type="checkbox" className="form-check-input" id="check1" name="option1" onChange={(event) => {
											setMsgState({...msgState, weding: state.wedding ? false : true})}} />
											<label className="form-check-label" htmlFor="check1">Wedding</label></div>
										<div className='col-md-6' style={{marginBottom : '10px'}}><input type="checkbox" className="form-check-input" id="check1" name="option1" onChange={(event) => {
											setMsgState({...msgState, prewed: state.prewed ? false : true})}} />
											<label className="form-check-label" htmlFor="check1">Day</label></div>
									</div>
									<div className='toggle-section'><span     style={{marginRight: '37%'}}>Notify Me on Whatsapp{toggle}</span><ToggleButton
										value={toggle}
										onToggle={(value) => {
											setToggle(!toggle)
											setMsgState({
												...msgState, toggle: !value,
											})
										}} /></div>
									<button className="deal-btn" style={{
										width: '100%', background: '#F180AB', border: '#F180AB',
										borderRadius: '12px '
									}} onClick={sendMessage}>
										Check Availability & Grab the Best Deal
									</button>
									</form>
									</div>}
									{showOtp && <div className='otpSection'>
										<p>An OTP has been sent to your mobile no.</p>
										<p>{state.phone}</p>
										<div className='col-md-12'><input type="text" style={{ width: '100%' }} onChange={event => setOtp(event.target.value)} placeholder='Enter OTP'  required /></div>
									<button className="deal-btn" style={{
										width: '100%', background: '#F180AB', border: '#F180AB',
										borderRadius: '12px '
									}} onClick={verifyOtp}>
										Verify to send message
									</button>
									
									</div>}
									{otpSuccess && <div className='otpVerified'>
										<img src="/pic/icon/check.png" className='check-img'></img>
									<p>Mobile number verified and message </p>
									<p style={{textAlign: 'center'}}>
sent to the vendor</p>
									</div>}
								</div>
								

							</div>
						</div>
					</div>
				</div>


				{ details?.ameneties?.length && <div className="container rptb">
					<h2 className='area-title'>Ameneties</h2>
					<div className="row" style={{ width: '70%',     marginTop: '20px' }}>
						{details && details.ameneties && details.ameneties.map(item => <div className="col-md-3">
							<div className="ptb">
								<img src={`/pic/ct/${item}.png`} className="msz" alt="" /><span className="amenities">{item}</span>
							</div>

						</div>)}
					</div>
				</div>}
				{showModal && <Modal isOpen={true}>
					<span className="close-modal" onClick={() => {setShowModal(false);
						setCount(0)}}>x</span>
				 {details.images && details.images.length && <div className="col-md-12 car-img">
							<span className="prev-buttn"  onClick={() => 
								count !=0 ? setCount(count-1) : ''}>{`<`}</span>
								<img src={baseUrl + details.images[count]} dataAtr={count} className="img-rounded mgtz" alt="" width="60%" height="500px" />
								<span className="next-buttn" onClick={() => {
									if(count != details.images.length-1) {setCount(count+1)}}}>{`>`}</span>
						</div>}
                    
      </Modal>}
				{details?.area_avail?.length && <div className="container rptb">
					<h2 className='area-title'>Areas Available</h2>
					<div className="row">
						{details && details.area_avail && details.area_avail.map(item => <div className="col-lg-4" style={{marginTop: '20px',marginBottom: '20px'}}>
							<div className="ptb">
								<p className='capacity'><b>{item.type}</b><br /><span className='capacity'>Capacity {item.capacity} people</span></p>
							</div>
							{/* <div className="ptb">
							<p><b>Pool Side</b><br />Capacity 500-600 people</p>
						</div>
						<div className="ptb">
							<p><b>Garden</b><br />Capacity 500-600 people</p>
						</div> */}
						</div>)}
						{/* <div className="col-lg-6">
						<div className="ptb">
							<p><b>Lounge</b><br /> Capacity 500-600 people</p>
						</div>
						<div className="ptb">
							<p><b>Banquet</b><br /> Capacity 500-600 people</p>
						</div>
						<div className="ptb">
							<p><b>Garden</b><br />Capacity 500-600 people</p>
						</div>
					</div> */}
					</div>
				</div>}

				<div className="container rptb">
					<div className="row">
						<div className="d-flex ptb " >
							<span className="media" style={{borderBottom: !isVideo ?
'4px solid #FF477E' : ''}} onClick={() => setIsVideo(false)}> Photographs</span> <span className="set media" style={{borderBottom: isVideo ?
	'4px solid #FF477E' : ''}} onClick={() => setIsVideo(true)}>Videos</span>
						</div>
						{!isVideo && details && details.images && details.images.map((item,index) => <div className="col-lg-3">
							<img onClick={() => {setCount(index);
							setShowModal(true)}} src={baseUrl + item} className="img-rounded mgtz" alt="" width="100%" height="auto" />
						</div>)}

						{isVideo && details?.videos?.length && details.videos.map(item => <div className="col-lg-3">
							
							<iframe width="250" height="360" src={baseUrl + item} title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
						</div>)}

					</div>
					
				</div>
				<div className="container rptb">
					<div className="col-lg-12">
						<p className='desc-title'><b>About {details.name}</b></p>
						<p className='desc-desc' dangerouslySetInnerHTML={{__html: `${details.description}`}}></p>
					</div>
				</div>
				<div className="container rptb">
				<div className="col-lg-6 ">
					<h3><b>Customer Review</b></h3>
					{ratingList && ratingList.length && ratingList.map(item => <div className="reviewpb">
						<p className="rate">
							<img src={item.pic ? `baseUrl + ${item.pic}` : 'pic/ct/default-image.jpeg'} className="img-rounded" alt="" width="30" height="auto"  /> 
						<span style={{fontWeight: 600,position: 'relative',
    bottom: '5px'}}>{item.name}</span>
						<span>{Array.from({length: item.rating}, (_, i) => i + 1).map(item => <img src="/pic/ct/str1.png" alt="star" srcSet="" width="25" className="img-fluid pt-3 star-img" />)}</span>
                {Array.from({length: 5 - (item.rating ? item.rating : 0)}, (_, i) => i + 1).map(item => <img src="/pic/ct/str2.png" alt="star" srcSet="" width="25" className="img-fluid pt-3 star-img" />)}
							</p>
						<p>{item.review}</p>
					</div>)}
					{/* <div className="more"><a href="#">load more</a> <span>&#8595;</span></div> */}
				</div>
				<div className="col-lg-6 reviewform">
					<h4 style={{ fontSize: '1.2rem', fontWeight: '500', fontColor: 'black' }} className="pb"><b>Leave a Review</b></h4>
					<p className="pb">Leave your product review so other buyers can rely on your opinion about the product.</p>
					{arr.map((item,index) => <span style={{cursor: 'pointer'}} onClick={() => setReview(index)}><img src={reveiewArray[index] ? '/pic/ct/str1.png' : '/pic/ct/str2.png'} alt="star" srcSet="" width="25" className="img-fluid pt-3 star-img" /></span>)}
					<form onSubmit={(event) => event.preventDefault()}>
					<input type="feedback"  ref={ref1} className="form-control botm"  placeholder="Enter your feedback" name="feedback" onChange={event => setFeedback(event.target.value)}/><br /><br />
						<button className="btn btn-primary btsk mt-5" onClick={() => {
							
							addRating()}}>Submit your Review</button>
					</form>
				</div>
			</div>
				<div className="container rpt">
					<div className="col-lg-12">
						<p className='desc-title'><b>Facts about Hotel Royal Orchid</b></p>
						{details && details.facts && details.facts.map((item, index) => <div className='facts'>
							<h5 className='faq-ques'><b>{index + 1}. {item.ques}</b></h5>
							<p>{item.ans}</p>
						</div>)}
						{/* <h5><b>1. What happens to my advance if i cancel at the last moment?</b></h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
						esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
					</p>
					<h5><b>1. What happens to my advance if i cancel at the last moment?</b></h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
						esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
					</p>
					<h5><b>1. What happens to my advance if i cancel at the last moment?</b></h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
						esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
					</p> */}
					</div>
				</div>
				<div className="container bbox" ><div className='row' ><h4><span style={{fontSize: '31px', fontWeight: '500'}}>Related Vendors</span></h4>
				{/* <hr style={{borderBottom: '3px solid #FF477E'}}></hr> */}
				{details && details.relatedObjects &&  details.relatedObjects.filter(item => item._id!=details._id).map(item => <div className="col-md-3 p-3">
				
            <div className="card justify-items-center ">
              <div className="card-img" style={{cursor: 'pointer'}}>
				   {item?.images?.length && <img src={baseUrl + item.images[0]} onClick={()=>{
					  navigate(`/entity/${type}/${item._id}`);
				  }}className="card-img-top img-fluid cat-img" />}
              </div>
              <div className="card-img-overlays " style={{bottom: '27%'}}>
                <button type="button" className="btn btn-primary round">{(item.tag && item.tag.length) ? item.tag[0] : 'Primary'}</button>
              </div>
              <div style={{marginTop: '25px'}}>
              {Array.from({length: item.avgRating}, (_, i) => i + 1).map(item => <img src="/pic/ct/str1.png" alt="star" srcSet="" width="25" className="img-fluid pt-3 star-img" />)}
                {Array.from({length: 5 - (item.avgRating ? item.avgRating : 0)}, (_, i) => i + 1).map(item => <img src="/pic/ct/str2.png" alt="star" srcSet="" width="25" className="img-fluid pt-3 star-img" />)}
              </div>
              <h4 className="pt-2">{item.name}</h4>
              <img src="/pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" />
              <span className="mtext">{item.address}</span>

            </div>
          </div>)}
		  </div>
		  </div></div>}</>
	)
}

export default Details;