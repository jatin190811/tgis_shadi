// // import React, { useEffect, useState } from 'react';
// // import { Link, NavLink } from "react-router-dom";
// // import axios from 'axios';
// // import { ToastContainer, toast } from 'react-toastify';
// // import helperServices from '../services/helperServices';

// // import searchIcon from '../assets/search-icon.svg';
// // import userIcon from '../assets/user.svg';
// // import heartIcon from '../assets/heart.svg';

// // function Header() {
// //     const usertoken = localStorage.getItem('token');
// //     const [token, setToken] = useState(usertoken);
// //     const [list, setList] = useState([]);


    
// //     useEffect(() => {
// //         if(token) {
// //             let url = 'http://146.190.30.14:8090/api/v1/likelist';
// //             axios({
// //                 method: 'POST',
// //                 url,
// //                 headers: {
// //                   'content-type': 'application/json',
// //                   'x-access-token': localStorage.getItem('token')
// //                 },
// //               }).then((resp) => {
// //                 if (resp.statusText == "OK") {
// //                   if (resp.data.status == 'error') toast.error(resp.data.message, {});
// //                   setList(resp.data.data);
// //                 } else {
            
// //                 }
// //               })
// //             }
// //             //console.log("helper",helperServices)
// //          //helperServices.getLike.subscribe((data) => console.log("like list",data))
// //     },[]
// //     )
// //     return (
// //         <>
// //             <div className="container-fluid top-header">
// //                 <div className="row bg-red pt-2">
// //                     <div className="col-md-6 col-sm-12 text-black text-start" style={{ paddingLeft: '6%' }}>
// //                         <p className="headertext"><b>30% off</b> on all products enter code: thegreatindianshaadi2022</p>
// //                     </div>
// //                     <div className="col-md-6 col-sm-12 text-black text-end" style={{ paddingRight: '6%' }}>
// //                         <p className="headertext">Call us: <b>+1 800 452 78 87</b></p>
// //                     </div>
// //                 </div>
// //             </div>

// //             <nav className="navbar navbar-expand-lg navbar-light bg-color">
// //                 <a className="navbar-brand d-lg-none" href="#wedding"><img src="/pic/logo.png" className='cur-point'/></a>
// //                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbarToggler7"
// //                     aria-controls="myNavbarToggler7" aria-expanded="false" aria-label="Toggle navigation">
// //                     <span className="navbar-toggler-icon"></span>
// //                 </button>
// //                 <div className="collapse navbar-collapse" id="myNavbarToggler7">
// //                     <ul className="navbar-nav  mx-auto">


// //                         <NavLink className="nav-item" to="/list/venues">
// //                             <span className="nav-link">Venues</span>
// //                         </NavLink>
// //                         <NavLink className="nav-item" to="/category">
// //                             <span className="nav-link">Vendors</span>
// //                         </NavLink>
// //                         <NavLink className="nav-item" to="/blogs">
// //                             <span className="nav-link">Blog</span>
// //                         </NavLink>
// //                         <NavLink className="nav-item" to="/contact">
// //                             <span className="nav-link">Contact</span>
// //                         </NavLink>

// //                         <Link className="d-none d-lg-block" to="/"><img src="/pic/logo.png" className="img-fluid logocenter" alt="logo" /></Link>
// //                         <Link className="nav-link" to="/search">
// //                         {/* <i className="fa fa-fw fa-search "></i> */}
// //                         <i><img src={ searchIcon } /></i>
// //                         </Link>
// //                         <li className="nav-item">
// //                             {/* {!token && <Link className="nav-link" to="/login"><i className="fa fa-fw fa-user "></i></Link>}
// //                             {token && <Link className="nav-link" to="/profile"><i className="fa fa-fw fa-user "></i></Link>} */}
// //                             {!token && <Link className="nav-link" to="/login"><i><img src={ userIcon } /></i></Link>}
// //                             {token && <Link className="nav-link" to="/profile"><i><img src={ userIcon } /></i></Link>}
// //                         </li>
// //                         <li className="nav-item">
// //                             {/* {!token && <Link className="nav-link" to="/login"><i className="fa fa-heart" aria-hidden="true"></i></Link>}
// //                             {token && <Link className="nav-link" to="/wishlist"    ><i className="fa fa-heart" aria-hidden="true"><span class="dot"><span className='wishCount'>{list?.length}</span></span></i></Link>} */}
// //                             {!token && <Link className="nav-link" to="/login"><i><img src={ heartIcon } /></i></Link>}
// //                             {token && <Link className="nav-link" to="/wishlist"    ><i><img src={ heartIcon } /><span class="dot"><span className='wishCount'>{list?.length}</span></span></i></Link>}

// //                         </li>
// //                     </ul>
// //                 </div>
// //             </nav>
// //         </>
// //     )
// // }

// // export default Header;















// import React, { useEffect, useState } from 'react';
// import { Link, NavLink } from "react-router-dom";
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import helperServices from '../services/helperServices';

// import searchIcon from '../assets/search-icon.svg';
// import userIcon from '../assets/user.svg';
// import heartIcon from '../assets/heart.svg';

// function Header() {
//     const usertoken = localStorage.getItem('token');
//     const [token, setToken] = useState(usertoken);
//     const [list, setList] = useState([]);


    
//     useEffect(() => {
//         if(token) {
//             let url = 'http://146.190.30.14:8090/api/v1/likelist';
//             axios({
//                 method: 'POST',
//                 url,
//                 headers: {
//                   'content-type': 'application/json',
//                   'x-access-token': localStorage.getItem('token')
//                 },
//               }).then((resp) => {
//                 if (resp.statusText == "OK") {
//                   if (resp.data.status == 'error') toast.error(resp.data.message, {});
//                   setList(resp.data.data);
//                 } else {
            
//                 }
//               })
//             }
//             //console.log("helper",helperServices)
//          //helperServices.getLike.subscribe((data) => console.log("like list",data))
//     },[]
//     )
//     return (
//         <div className='header' style={{ backgroundColor: '#f8f8f8' }}>
//             <div className="container-fluid top-header">
//                 <div className="row bg-red pt-2 " style={{ maxWidth: '100vw', margin: '0', paddingRight: '5vw', paddingLeft: '5vw' }}>
//                     <div className="col-md-6 col-sm-12 text-black text-start" style={{ paddingRight: '0', paddingLeft: '1.5rem' }}>
//                         <p className="headertext"><b>30% off</b> on all products enter code: thegreatindianshaadi2022</p>
//                     </div>
//                     <div className="col-md-6 col-sm-12 text-black text-end" style={{ paddingLeft: '0%', paddingRight: '1.5rem' }}>
//                         <p className="headertext">Call us: <b>+1 800 452 78 87</b></p>
//                     </div>
//                 </div>
//             </div>

//             <nav style={{ paddingRight: '5vw', paddingLeft: '5vw' }} className="navbar navbar-expand-lg navbar-light bg-color">
//                 <a className="navbar-brand d-lg-none" href="#wedding"><img src="/pic/logo.png" className='cur-point'/></a>
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbarToggler7"
//                     aria-controls="myNavbarToggler7" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="myNavbarToggler7">
//                     <ul className="navbar-nav  mx-auto" style={{ alignItems: 'center', width: '100%' }}>

//                         <div className='float-start col-md-3' style={{ display: 'flex'}} id='Navlinks'>
//                             <NavLink className="nav-item" to="/list/venues">
//                                 <span className="nav-link">Venues</span>
//                             </NavLink>
//                             <NavLink className="nav-item" to="/category">
//                                 <span className="nav-link">Vendors</span>
//                             </NavLink>
//                             <NavLink className="nav-item" to="/blogs">
//                                 <span className="nav-link">Blog</span>
//                             </NavLink>
//                             <NavLink className="nav-item" to="/contact">
//                                 <span className="nav-link">Contact</span>
//                             </NavLink>
//                         </div>


//                         <Link className="col-md-6" to="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '50px' }}><img src="/pic/logo.png" className="img-fluid logocenter" alt="logo" width='200px' style={{ objectFit: 'cover' }} /></Link>

//                         {/* <Link className="d-none d-lg-block col-md-6" to="/"><img src="/pic/logo.png" className="img-fluid logocenter" alt="logo" /></Link> */}
//                         <div className='col-md-3' style={{ display: 'flex', justifyContent: 'flex-end'}} id='UserSection'>
//                             <Link className="nav-link" to="/search">
//                             {/* <i className="fa fa-fw fa-search "></i> */}
//                             <i><img src={ searchIcon } /></i>
//                             </Link>
//                             <li className="nav-item">
//                                 {/* {!token && <Link className="nav-link" to="/login"><i className="fa fa-fw fa-user "></i></Link>}
//                                 {token && <Link className="nav-link" to="/profile"><i className="fa fa-fw fa-user "></i></Link>} */}
//                                 {!token && <Link className="nav-link" to="/login"><i><img src={ userIcon } /></i></Link>}
//                                 {token && <Link className="nav-link" to="/profile"><i><img src={ userIcon } /></i></Link>}
//                             </li>
//                             <li className="nav-item">
//                                 {/* {!token && <Link className="nav-link" to="/login"><i className="fa fa-heart" aria-hidden="true"></i></Link>}
//                                 {token && <Link className="nav-link" to="/wishlist"    ><i className="fa fa-heart" aria-hidden="true"><span class="dot"><span className='wishCount'>{list?.length}</span></span></i></Link>} */}
//                                 {!token && <Link className="nav-link" to="/login"><i><img src={ heartIcon } /></i></Link>}
//                                 {token && <Link className="nav-link" to="/wishlist"    ><i><img src={ heartIcon } /><span class="dot"><span className='wishCount'>{list?.length}</span></span></i></Link>}

//                             </li>
//                         </div>
//                     </ul>
//                 </div>
//             </nav>
//         </div>
//     )
// }

// export default Header;









// import React, { useEffect, useState } from 'react';
// import { Link, NavLink } from "react-router-dom";
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import helperServices from '../services/helperServices';

// import searchIcon from '../assets/search-icon.svg';
// import userIcon from '../assets/user.svg';
// import heartIcon from '../assets/heart.svg';

// function Header() {
//     const usertoken = localStorage.getItem('token');
//     const [token, setToken] = useState(usertoken);
//     const [list, setList] = useState([]);


    
//     useEffect(() => {
//         if(token) {
//             let url = 'http://134.209.153.76:8090/api/v1/likelist';
//             axios({
//                 method: 'POST',
//                 url,
//                 headers: {
//                   'content-type': 'application/json',
//                   'x-access-token': localStorage.getItem('token')
//                 },
//               }).then((resp) => {
//                 if (resp.statusText == "OK") {
//                   if (resp.data.status == 'error') toast.error(resp.data.message, {});
//                   setList(resp.data.data);
//                 } else {
            
//                 }
//               })
//             }
//             //console.log("helper",helperServices)
//          //helperServices.getLike.subscribe((data) => console.log("like list",data))
//     },[]
//     )
//     return (
//         <>
//             <div className="container-fluid top-header">
//                 <div className="row bg-red pt-2">
//                     <div className="col-md-6 col-sm-12 text-black text-start" style={{ paddingLeft: '6%' }}>
//                         <p className="headertext"><b>30% off</b> on all products enter code: thegreatindianshaadi2022</p>
//                     </div>
//                     <div className="col-md-6 col-sm-12 text-black text-end" style={{ paddingRight: '6%' }}>
//                         <p className="headertext">Call us: <b>+1 800 452 78 87</b></p>
//                     </div>
//                 </div>
//             </div>

//             <nav className="navbar navbar-expand-lg navbar-light bg-color">
//                 <a className="navbar-brand d-lg-none" href="#wedding"><img src="/pic/logo.png" className='cur-point'/></a>
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbarToggler7"
//                     aria-controls="myNavbarToggler7" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="myNavbarToggler7">
//                     <ul className="navbar-nav  mx-auto">


//                         <NavLink className="nav-item" to="/list/venues">
//                             <span className="nav-link">Venues</span>
//                         </NavLink>
//                         <NavLink className="nav-item" to="/category">
//                             <span className="nav-link">Vendors</span>
//                         </NavLink>
//                         <NavLink className="nav-item" to="/blogs">
//                             <span className="nav-link">Blog</span>
//                         </NavLink>
//                         <NavLink className="nav-item" to="/contact">
//                             <span className="nav-link">Contact</span>
//                         </NavLink>

//                         <Link className="d-none d-lg-block" to="/"><img src="/pic/logo.png" className="img-fluid logocenter" alt="logo" /></Link>
//                         <Link className="nav-link" to="/search">
//                         {/* <i className="fa fa-fw fa-search "></i> */}
//                         <i><img src={ searchIcon } /></i>
//                         </Link>
//                         <li className="nav-item">
//                             {/* {!token && <Link className="nav-link" to="/login"><i className="fa fa-fw fa-user "></i></Link>}
//                             {token && <Link className="nav-link" to="/profile"><i className="fa fa-fw fa-user "></i></Link>} */}
//                             {!token && <Link className="nav-link" to="/login"><i><img src={ userIcon } /></i></Link>}
//                             {token && <Link className="nav-link" to="/profile"><i><img src={ userIcon } /></i></Link>}
//                         </li>
//                         <li className="nav-item">
//                             {/* {!token && <Link className="nav-link" to="/login"><i className="fa fa-heart" aria-hidden="true"></i></Link>}
//                             {token && <Link className="nav-link" to="/wishlist"    ><i className="fa fa-heart" aria-hidden="true"><span class="dot"><span className='wishCount'>{list?.length}</span></span></i></Link>} */}
//                             {!token && <Link className="nav-link" to="/login"><i><img src={ heartIcon } /></i></Link>}
//                             {token && <Link className="nav-link" to="/wishlist"    ><i><img src={ heartIcon } /><span class="dot"><span className='wishCount'>{list?.length}</span></span></i></Link>}

//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//         </>
//     )
// }

// export default Header;















import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import helperServices from '../services/helperServices';

import searchIcon from '../assets/search-icon.svg';
import userIcon from '../assets/user.svg';
import heartIcon from '../assets/heart.svg';
import PopUp from './popup';

function Header() {
    const usertoken = localStorage.getItem('token');
    const [token, setToken] = useState(usertoken);
    const [list, setList] = useState([]);


    
    useEffect(() => {
        if(token) {
            let url = 'http://134.209.153.76:8090/api/v1/likelist';
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


    const downloadAction = ()=> {
        console.log("Hello");
    }


    return (
        <div className='header' style={{ backgroundColor: '#f8f8f8' }}>
            <div className="container-fluid top-header">
                <div className="row bg-red pt-2 " style={{ maxWidth: '100vw', margin: '0', paddingRight: '5vw', paddingLeft: '5vw' }}>
                    <div className="col-md-6 col-sm-12 text-black text-start" style={{ paddingRight: '0', paddingLeft: '1.5rem' }}>
                        <p onClick={ downloadAction } className="headertext"><b>Download Mobile App</b></p>
                    </div>
                    <div className="col-md-6 col-sm-12 text-black text-end" style={{ paddingLeft: '0%', paddingRight: '1.5rem' }}>
                        <p className="headertext">Call us: <b>+1 800 452 78 87</b></p>
                    </div>
                </div>
            </div>

            <nav style={{ paddingRight: '5vw', paddingLeft: '5vw' }} className="navbar navbar-expand-lg navbar-light bg-color">
                {/* <a className="navbar-brand d-lg-none" href="#wedding"><img src="/pic/logo.png" className='cur-point'/></a> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbarToggler7"
                    aria-controls="myNavbarToggler7" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="myNavbarToggler7">
                    <ul className="navbar-nav  mx-auto" style={{ alignItems: 'center', width: '100%' }}>

                        <div className='float-start col-md-3' style={{ display: 'flex'}} id='Navlinks'>
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
                        </div>


                        <Link className="col-md-6" to="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '50px' }}><img src="/pic/logo.png" className="img-fluid logocenter" alt="logo" width='200px' style={{ objectFit: 'cover' }} /></Link>

                        {/* <Link className="d-none d-lg-block col-md-6" to="/"><img src="/pic/logo.png" className="img-fluid logocenter" alt="logo" /></Link> */}
                        <div className='col-md-3' style={{ display: 'flex', justifyContent: 'flex-end'}} id='UserSection'>
                            <Link className="nav-link" to="/search">
                            {/* <i className="fa fa-fw fa-search "></i> */}
                            <i><img src={ searchIcon } /></i>
                            </Link>
                            <li className="nav-item">
                                {/* {!token && <Link className="nav-link" to="/login"><i className="fa fa-fw fa-user "></i></Link>}
                                {token && <Link className="nav-link" to="/profile"><i className="fa fa-fw fa-user "></i></Link>} */}
                                {!token && <Link className="nav-link" to="/login"><i><img src={ userIcon } /></i></Link>}
                                {token && <Link className="nav-link" to="/profile"><i><img src={ userIcon } /></i></Link>}
                            </li>
                            <li className="nav-item">
                                {/* {!token && <Link className="nav-link" to="/login"><i className="fa fa-heart" aria-hidden="true"></i></Link>}
                                {token && <Link className="nav-link" to="/wishlist"    ><i className="fa fa-heart" aria-hidden="true"><span class="dot"><span className='wishCount'>{list?.length}</span></span></i></Link>} */}
                                {!token && <Link className="nav-link" to="/login"><i><img src={ heartIcon } /></i></Link>}
                                {token && <Link className="nav-link" to="/wishlist"    ><i><img src={ heartIcon } /><span class="dot"><span className='wishCount'>{list?.length}</span></span></i></Link>}

                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;