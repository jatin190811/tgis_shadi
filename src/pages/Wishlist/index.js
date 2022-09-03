import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link,useParams } from "react-router-dom";

function Wishlist() {
  let url = 'http://134.209.153.76:8090/api/v1/likelist';
  let baseUrl = 'http://134.209.153.76:8090/';
  const [list, setList] = useState([]);


  useEffect(() => {
    getWishList();
  }, [])
  const getWishList = () => axios({
    method: 'POST',
    url,
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  }).then((resp) => {
    if (resp.statusText == "OK") {
      if (resp.data.status == 'error') toast.error(resp.data.message, {});
      setList(resp.data.data);
    } else {

    }
  })

  const setUnFav = (item) => {
    let token = localStorage.getItem('token');

    let url = 'http://134.209.153.76:8090/api/v1/unlike';
    axios({
      method: 'POST',
      url,
      headers: {
        'content-type': 'application/json',
        'x-access-token': token
      },
      data: {
        pid: item._id,
        type: item.likeType 
      }
    }).then((resp) => {
      getWishList();
    })

  }
  return (
    <div className='wishlist-page'>
      <div className="container-fluid  box-imgages" style={{ backgroundImage: 'url("pic/wishlist.png")' }} >
        <div className="row">
          <div className="clo-lg-12 col-md-12 col-sm-12">

            <h1 className="wish-text text-white text-center" style={{ letterSpacing: '3px' }}>Wishlist</h1>

          </div>

        </div>
      </div>

      <div className="container mt-5" style={{marginLeft:'4%'}}>
        <div className="row">
          <div className="col py-3">
            <img src="pic/icon/h.png" alt="" srcset="" className="like-img img-fluid" />
            <span style={{fontWeight: '700'}}>My Wishlist</span>  &nbsp; {list?.length} items
          </div>
        </div>
      </div>
      <div className="container-fluid " >

        <div className="row justify-content-center g-4 p-lg-5">

          {list && list.length && list.map(item => <div className="col-md-3 p-3">
            <div className="card justify-items-center ">
              <div className="card-img">
              <Link to={`/entity/${(item.likeType == 'venue') ? 'venues' :item.likeType }/${item._id}`}>
                <img src={baseUrl + item.images[0]} className="card-img-top wish-img img-fluid" />
                </Link>
              </div>
              <i className="fas fa-times" style={{cursor: 'pointer'}} onClick={() => setUnFav(item)}></i>
              <div className="card-img-overlays ">
                {item && item.tag && item.tag.length && <button type="button" className="btn btn-primary round">{item?.tag[0]}</button> }

              </div>
              <div style={{marginTop: '5%'}}>
              {Array.from({length: item.avgRating}, (_, i) => i + 1).map(item => <img src="/pic/ct/str1.png" alt="star" srcSet="" width="25" className="img-fluid pt-3 star-img" />)}
                {Array.from({length: 5 - (item.avgRating ? item.avgRating : 0)}, (_, i) => i + 1).map(item => <img src="/pic/ct/str2.png" alt="star" srcSet="" width="25" className="img-fluid pt-3 star-img" />)}
              <h4 className=" item-name">{item.name}</h4>
              <img src="pic/Vector.png" alt="loccationn" srcset="" className="img-fluid locat" width="15px" />
              <span className="" style={{paddingLeft: '7px'}}>{item.address}</span>
              <p style={{marginTop:'2%'}}>{item.price}</p>
              </div>

            </div>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default Wishlist;