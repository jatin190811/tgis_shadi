import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import helperServices from '../services/helperServices';

function Header() {
    const usertoken = localStorage.getItem('token');
    const [token, setToken] = useState(usertoken);
    const [list, setList] = useState([]);


    
    useEffect(() => {
        if(token) {
            let url = 'http://146.190.30.14:8090/api/v1/likelist';
            axios({
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
            }
            //console.log("helper",helperServices)
         //helperServices.getLike.subscribe((data) => console.log("like list",data))
    },[]
    )
    return (
        <>
            <div className="container-fluid top-header">
                <div className="row bg-red pt-2">
                    <div className="col-md-6 col-sm-12 text-black text-start" style={{ paddingLeft: '4%' }}>
                        <p className="headertext"><b>30% off</b> on all products enter code: thegreatindianshaadi2022</p>
                    </div>
                    <div className="col-md-6 col-sm-12 text-black text-end" style={{ paddingRight: '4%' }}>
                        <p className="headertext">Call us: <b>+1 800 452 78 87</b></p>
                    </div>
                </div>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-color">
                <a className="navbar-brand d-lg-none" href="#wedding"><img src="/pic/logo.png" className='cur-point'/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbarToggler7"
                    aria-controls="myNavbarToggler7" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="myNavbarToggler7">
                    <ul className="navbar-nav  mx-auto">


                        <NavLink className="nav-item" to="/list/venues">
                            <span className="nav-link">Venues</span>
                        </NavLink>
                        <NavLink className="nav-item" to="/category">
                            <span className="nav-link">Vendors</span>
                        </NavLink>
                        <NavLink className="nav-item" to="/blogs">
                            <span className="nav-link">Blog</span>
                        </NavLink>
                        <NavLink className="nav-item" to="/contact">
                            <span className="nav-link">Contact</span>
                        </NavLink>

                        <Link className="d-none d-lg-block" to="/"><img src="/pic/logo.png" className="img-fluid logocenter" alt="logo" /></Link>
                        <Link className="nav-link" to="/search">
                        <i className="fa fa-fw fa-search "></i>
                        </Link>
                        <li className="nav-item">
                            {!token && <Link className="nav-link" to="/login"><i className="fa fa-fw fa-user "></i></Link>}
                            {token && <Link className="nav-link" to="/profile"><i className="fa fa-fw fa-user "></i></Link>}
                        </li>
                        <li className="nav-item">
                            {!token && <Link className="nav-link" to="/login"><i className="fa fa-heart" aria-hidden="true"></i></Link>}
                            {token && <Link className="nav-link" to="/wishlist"    ><i className="fa fa-heart" aria-hidden="true"><span class="dot"><span className='wishCount'>{list?.length}</span></span></i></Link>}

                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header;