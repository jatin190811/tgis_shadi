// import React, { useEffect, useState } from 'react';
// import './index.css';
// import axios from 'axios';
// import { Link,useParams } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import { startCase } from 'lodash';


// function List() {

//   const [list, setList] = useState([]);
//   const [message, setMessage] = useState([]);
//   const [filter, setFilter] = useState({});
//   const [filterObj, setFilterObj] = useState({});
//   const [showFilter, setShowFilter] = useState(false);
//   const [searchValue, setSearchValue] = useState('');
//   const [subCatList, setSubCatList] = useState([]);
//   const [subCat, setSubCat] = useState('');
//   const [city, setCity] = useState('');
//   const [inhouse, setInhouse] = useState(false);
//   // const [types, setTypes] = useState('');
//   const [rating, setRating] = useState();
//   const [areas, setAreas] = useState([]);
//   const [selectValue, setSelectValue] = useState('');
//   const baseUrl = "http://146.190.30.14:8090/";

//   let type, type1;
//   // useEffect(() => {
    
//   // },[])
//   let types = useParams();
// //   if( types["type"].includes('inhouse') && !inhouse){  
// //     setInhouse(true)
// //     type = types["type"].split("-")[0];
// //   }
// // else if( !types["type"].includes('inhouse')){
// //   type = types["type"]
// // }
// // else { 
// //   type = types["type"].split("-")[0];
// // }
//    type= types["type"];
//   if(type == 'venues')
//   type1 = 'venues';
//   if(type == 'makeup')
// 	type1 = 'bridal-makeups';
//   else if(type == 'bridalwear')
//   type1 =  'bridal-wears';
//   else if(type == 'groomwear')
//   type1 =  'groom';
//   else if(type == 'photographer')
//   type1 =  'photographers';
//   else if(type == 'mehandi')
//   type1 =  'mehndi';
//   else if(type == 'decor')
//   type1 =  'planner';
  

//   useEffect(() => {
    
//       getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
//       getAreas(`http://146.190.30.14:8090/api/v1/areas`)
    
    
    
//   }, [])
//   const getArea = () => {
//     getAreas(`http://146.190.30.14:8090/api/v1/areas`)
//   }
//   useEffect(() => {
//     getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
//   }, [subCat])

//   // useEffect(() => {
//   //  filter["areas"] = areas;
//   //  setFilter(filter)
//   // }, [areas])

//   useEffect(() => {
//     if(Object.keys(filterObj).length == 0) 
//     getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
//   }, [filterObj])
//   // useEffect(() => {
//   //   getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
//   // }, [rating])
//   const getCategories = (url) => axios({
//     method: 'POST',
//     url,
//     headers: {
//       'content-type': 'application/json',
//     },
//     data: {
//       appliedFilters: Object.keys(filterObj).length ? filterObj : null,
//       searchParam: searchValue ? searchValue : null,
//       sub_cat: subCat ? subCat : null,
//       city: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).city : null,
//       avgRating: rating,
//       inhouse: inhouse ? true : false
//     }
//   }).then((resp) => {
//     if (resp.statusText == "OK") {
//       if (resp.data.status == 'error') toast.error(resp.data.message, {});
//       setList(resp.data.data);
//       setMessage(resp.data.message)
//       if(resp.data && resp.data.filters && resp.data.filters.filters) {
//         console.log("resp.data.filters.filters",resp.data.filters.filters)
//         let finalObj = structuredClone(resp.data.filters.filters);
//         finalObj["areas"] = areas;
//         console.log("resp.data.filters.filters", finalObj)
//         setFilter(finalObj);
//         setSubCatList(resp?.data?.filters?.sub_cat)
//       }
//       else {
//         setFilter([])
//       }
//     } else {

//     }
//   })

//   const getAreas = (url) => axios({
//     method: 'POST',
//     url,
//     headers: {
//       'content-type': 'application/json',
//       'x-access-token': localStorage.getItem('token')
//     },
//     data: {
//       type: 'venue',
//       city: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).city : null,
//     }
//   }).then((resp) => {
//     console.log("resp",resp)
//     if (resp.statusText == "OK") {
//       if (resp.data.status == 'error') toast.error(resp.data.message, {});
//       let finalObj = structuredClone(filter);
//       setAreas(resp.data.data)
//       finalObj["areas"] = resp.data.data;
//       setFilter(finalObj)
//     } else {

//     }
//   })
//   const handleChange = (value) => {
//     setRating(value);
    
//   }
//   useEffect(()=>{
//     getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
//   },[rating])
//   const checkHandler = (event,key) => {
//     let applyFilters = structuredClone(filterObj);
//     if(applyFilters[key]) {
//       if(applyFilters[key].includes(event.target.value)) {
//         applyFilters[key].splice(applyFilters[key].indexOf(event.target.value), 1)
//       }
//       else {
//       applyFilters[key].push(event.target.value)
//     }
//     }
//     else {
//       applyFilters[key] = [event.target.value]
//     }
//     Object.keys(applyFilters).forEach(item => {
//       if(applyFilters[item]?.length == 0) {
//         delete(applyFilters[item]);
//       }
//     })
//     setFilterObj(applyFilters)
//   }

//   const getFilteredResults = () => {
//   getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
   
//   }
//   const clearFilter = () => {
//     setFilterObj({});
//     }

//   // console.log(Object.entries(filter))
//   return (
//     <>
//     <div>
//       <div className="container-fluid  box-imgages" style={{ backgroundImage: 'url("/pic/ct/banner.png")' }} >
//         <div className="row">
//           <div className="clo-lg-12 col-md-12 col-sm-12">
// {/* 
//             <h1 className="list-text text-white text-center">Venues</h1>
//             <h4 className="text-white text-center">Home.Venues</h4> */}

//           </div>

//         </div>
//       </div>

//       <div className="container mt-5">


//         <div className="row">

//          {message && <div className="col-md-3 col-sm-12 py-3">
//             <p><b>{message}</b> </p>
//           </div>}

//           <div style={{ display: 'flex', alignItems: 'center' }} className="col-md-2 col-sm-12 py-3 text-center">

//           <span style={{cursor:'pointer', color: '#49516F'}} onClick={() => {
            
//             if(areas.length) getArea();
//             setShowFilter(!showFilter)}}><img src="/pic/icon/vector.png" alt="" srcSet="" className="img-fluid" />
//             Filters</span>
//           </div>

//           <div className="col-md-5 col-sm-12 px-3">
//             <form className="example" style={{height: '60px'}} onSubmit={(event) => event.preventDefault()} >
//               <input type="text" placeholder="Search venue or location" style={{ height: '45px', backgroundColor: 'transparent', fontSize: '1rem' }} name="search" onChange={(event)=> setSearchValue(event.target.value)}/>
//               <button ><i className="fa fa-search" onClick={getFilteredResults}></i></button>
//             </form>
//           </div>

//           <div style={{ display: 'flex', alignItems: 'center' }} className="col-md-2 col-sm-12">
//             <form style={{ width: '100%', height: '60px' }} action="/action_page.php">
//               <select className="form-select" id="sel1" name="sellist1"  onChange={(event) => handleChange(event.target.value)}>
//                 <option> By relevance</option>
//                 <option value="1" >1</option>
//                 <option value="2" >2</option>
//                 <option value="3" >3</option>
//                 <option value="4" >4</option>
//                 <option value="5" >5</option>
//               </select>
//             </form>
//           </div>

//         </div>
//       </div>
//       <div className="container pt-4">
//         <div className="row">
//           <div className="col-md-6"></div>
//           <div className="col-md-6"></div>
//         </div>
//       </div>
//       {showFilter  && <div className="container my-5 p-5 bbox">
//         <div className="row"> 
//           {filter && Object.keys(filter).map((key,index) => <div className="col-md-2" >
//             <img src={`/pic/ct/${key}.png`} alt="" srcSet="" className="img-fluid" /><span className='filter-icon'></span>
//             <span style={{ fontSize: '15px', fontWeight: '500' , position: 'relative', bottom:'5px', left: '2px'}}>{startCase(key)}</span>
//             <form action="/action_page.php" className="pt-4">
//               {/* {JSON.stringify(filter[key])} */}
//             { filter[key].map((item,index) => <div className=""> 
//             <input type="checkbox" className="form-check-input" id="check1" name="option1" value={filter[key][index]} 
//             checked={filterObj[key] && filterObj[key].includes(filter[key][index])}  onChange={(event) => checkHandler(event,key)}/>
//                 <label className="form-check-label" htmlFor="check1">{item}</label>
//               </div>)}
//             </form>
//           </div> )} 
//           <div className="col-md-3"></div>
//           <div className="col-md-3"></div>
//         </div>
//         <div className="row" style={{marginTop : '20px'}}>
//           <div className="col-md-3">
//           </div>
//           <div className="col-md-3">
//             <button type="submit" className="btn btn-primary btsk mt-3" onClick={clearFilter}>Clear All Filters</button>
//           </div>
//           <div className="col-md-3">
//             <button type="submit" className="btn btn-primary btsk mt-3" onClick={getFilteredResults}>View Results</button>
//           </div>
//           <div className="col-md-3">
//           </div>
//         </div>
//       </div>}

//       <div className="container-fluid ">
//         <hr style={{ color: '#f180ab', border: '1px solid' }} className="mx-5 g-0" />

//         <div className="row justify-content-center mylove g-0 p-5">
//           {subCatList && subCatList.map(item => <div className="col-2 float-end "><span className={subCat == item ? 'borderme' : 'nonborderme'} onClick={() => setSubCat(item)}>{item}</span></div>)}
//         </div>
//         {list.length ? <div className="row justify-content-center g-4 p-5">

//           {list && list.map(item => <div className="col-md-3 p-3">
//             <div className="card justify-items-center ">
//               <div className="card-img">
//                 <Link to={`/entity/${type}/${item._id}`}>
//                   {item?.images?.length && <img src={baseUrl + item.images[0]} className="card-img-top img-fluid cat-img" />}
//                 </Link>
//               </div>
//               <div className="card-img-overlays " style={{bottom: '27%'}}>
//                 <button type="button" className="btn btn-primary round">{(item.tag && item.tag.length) ? item.tag[0] : 'Primary'}</button>
//               </div>
//               <div style={{marginTop: '25px'}}>
//               {Array.from({length: item.avgRating}, (_, i) => i + 1).map(item => <img src="/pic/ct/str1.png" alt="star" srcSet="" width="25" className="img-fluid pt-3 star-img" />)}
//                 {Array.from({length: 5 - (item.avgRating ? item.avgRating : 0)}, (_, i) => i + 1).map(item => <img src="/pic/ct/str2.png" alt="star" srcSet="" width="25" className="img-fluid pt-3 star-img" />)}
//               </div>
//               <h4 className="pt-2">{item.name}</h4>
//               <img src="/pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" />
//               <span className="mtext">{item.address}</span>

//             </div>
//           </div>)}

//         </div> : <div className="row"   style={{display: 'flex', justifyContent: 'center', fontSize:'36px', margin: '100px', fontWeight: '500'}}>No Data Found!</div>}




//       </div>
//       </div></>
//   )
// }

// export default List;















import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import { Link,useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { startCase } from 'lodash';


function List() {

  const [list, setList] = useState([]);
  const [message, setMessage] = useState([]);
  const [filter, setFilter] = useState({});
  const [filterObj, setFilterObj] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [subCatList, setSubCatList] = useState([]);
  const [subCat, setSubCat] = useState('');
  const [defaultmsg, setDefaultmsg] = useState('Loading Data...');
  const [city, setCity] = useState('');
  const [inhouse, setInhouse] = useState(false);
  // const [types, setTypes] = useState('');
  const [rating, setRating] = useState();
  const [areas, setAreas] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const baseUrl = "http://146.190.30.14:8090/";

  let type, type1;
  let banner = {};
  // useEffect(() => {
    
  // },[])
  let types = useParams();
//   if( types["type"].includes('inhouse') && !inhouse){  
//     setInhouse(true)
//     type = types["type"].split("-")[0];
//   }
// else if( !types["type"].includes('inhouse')){
//   type = types["type"]
// }
// else { 
//   type = types["type"].split("-")[0];
// }
   type= types["type"];
  if(type == 'venues') {
  type1 = 'venues';
  banner = {
    img: 'banner.png',
    text: {
      title: 'Venues',
      desc: 'Home - Venues'
    }
  }}
  if(type == 'makeup') {
	type1 = 'bridal-makeups';
    banner = {
      img: 'makeupbanner.png',
      text: {
        title: 'Bridal Makeup',
        desc: 'Home - Bridal Makeup'
      }
    }}
  else if(type == 'bridalwear') {
  type1 =  'bridal-wears'; 
    banner = {
      img: 'bridalbanner.png',
      text: {
        title: 'Bridal Wear',
        desc: 'Home - Bridal Wear'
      }
    }}
  else if(type == 'groomwear') {
  type1 =  'groom';
    banner = {
      img: 'groombanner.png',
      text: {
        title: 'Groom Wear',
        desc: 'Home - Groom Wear'
      }
    }}
  else if(type == 'photographer') {
  type1 =  'photographers';
    banner = {
      img: 'photobanner.png',
      text: {
        title: 'Wedding Photographer',
        desc: 'Home - Wedding Photographer'
      }
    }}
  else if(type == 'mehandi') {
  type1 =  'mehndi';
    banner = {
      img: 'mehndibanner.png',
      text: {
        title: 'Mehndi',
        desc: 'Home - Mehndi'
      }
    }}
  else if(type == 'decor') {
  type1 =  'planner';
    banner = {
      img: 'plannerbanner.png',
      text: {
        title: "Wedding Planner & Decor",
        desc: 'Home - Planner & Decor'
      }
    }}
  

  useEffect(() => {
    
      getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
      getAreas(`http://146.190.30.14:8090/api/v1/areas`)
      window.scrollTo(0,0);
    
    
  }, [])
  const getArea = () => {
    getAreas(`http://146.190.30.14:8090/api/v1/areas`)
  }
  useEffect(() => {
    setList([])
    setDefaultmsg('Loading Data...')
    getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
  }, [subCat])

  // useEffect(() => {
  //  filter["areas"] = areas;
  //  setFilter(filter)
  // }, [areas])

  useEffect(() => {
    if(Object.keys(filterObj).length == 0) 
    getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
  }, [filterObj])
  // useEffect(() => {
  //   getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
  // }, [rating])
  const getCategories = (url) => axios({
    method: 'POST',
    url,
    headers: {
      'content-type': 'application/json',
    },
    data: {
      appliedFilters: Object.keys(filterObj).length ? filterObj : null,
      searchParam: searchValue ? searchValue : null,
      sub_cat: subCat ? subCat : null,
      city: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).city : null,
      avgRating: rating,
      inhouse: inhouse ? true : false
    }
  }).then((resp) => {
    if (resp.statusText == "OK") {
      if (resp.data.status == 'error') toast.error(resp.data.message, {});
      if(resp.data.data.length == 0)
      setDefaultmsg('No Data Found!')
      setList(resp.data.data);
      setMessage(resp.data.message)
      if(resp.data && resp.data.filters && resp.data.filters.filters) {
        let finalObj = structuredClone(resp.data.filters.filters);
        if(areas && areas.length)
        finalObj["area"] = areas;
        setFilter(finalObj);
        setSubCatList(resp?.data?.filters?.sub_cat)
      }
      else {
        setFilter([])
      }
    } else {

    }
  })

  const getAreas = (url) => axios({
    method: 'POST',
    url,
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    data: {
      type: 'venue',
      city: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).city : null,
    }
  }).then((resp) => {
    console.log("resp",resp)
    if (resp.statusText == "OK") {
      if (resp.data.status == 'error') toast.error(resp.data.message, {});
      let finalObj = structuredClone(filter);
      setAreas(resp.data.data)
      if(resp.data.data && resp.data.data.length)
      finalObj["area"] = resp.data.data;
      setFilter(finalObj)
    } else {

    }
  })
  const handleChange = (value) => {
    setRating(value);
    
  }
  useEffect(()=>{
    getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
  },[rating])
  const checkHandler = (event,key) => {
    let applyFilters = structuredClone(filterObj);
    if(applyFilters[key]) {
      if(applyFilters[key].includes(event.target.value)) {
        applyFilters[key].splice(applyFilters[key].indexOf(event.target.value), 1)
      }
      else {
      applyFilters[key].push(event.target.value)
    }
    }
    else {
      applyFilters[key] = [event.target.value]
    }
    Object.keys(applyFilters).forEach(item => {
      if(applyFilters[item]?.length == 0) {
        delete(applyFilters[item]);
      }
    })
    setFilterObj(applyFilters)
  }

  const getFilteredResults = () => {
    setList([])
    setDefaultmsg('Loading Data...');

    getCategories(`http://146.190.30.14:8090/api/v1/${type1}`)
   
  }
  const clearFilter = () => {
    setList([])
    setDefaultmsg('Loading Data...');


    setFilterObj({});
    }

  // console.log(Object.entries(filter))
  return (
    <>
    <div>
      <div className="container-fluid  box-imgages" style={{ backgroundImage: `url("/pic/ct/${banner.img}")` }} >
        <div className="row">
          <div className="clo-lg-12 col-md-12 col-sm-12">

            <h1 className="list-text text-white text-center">{banner.text.title}</h1>
            <h4 className="text-white text-center">{banner.text.desc}</h4>

          </div>

        </div>
      </div>

      <div className="container mt-5">


        <div className="row">

         {message && <div className="col-md-3 col-sm-12 py-3">
            <p><b>{message}</b> </p>
          </div>}

          <div style={{ display: 'flex', alignItems: 'center' }} className="col-md-2 col-sm-12 py-3 text-center">

          <span style={{cursor:'pointer', color: '#49516F'}} onClick={() => {
            
            if(areas.length) getArea();
            setShowFilter(!showFilter)}}><img style={{ paddingRight: '10px' }} src="/pic/icon/vector.png" alt="" srcSet="" className="img-fluid" />
            Filters</span>
          </div>

          <div className="col-md-5 col-sm-12 px-3">
            <form className="example" style={{height: '60px'}} onSubmit={(event) => event.preventDefault()} >
              <input type="text" placeholder="Search venue or location" style={{ height: '45px', backgroundColor: 'transparent', fontSize: '1rem' }} name="search" onChange={(event)=> setSearchValue(event.target.value)}/>
              <button ><i className="fa fa-search" onClick={getFilteredResults}></i></button>
            </form>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }} className="col-md-2 col-sm-12">
            <form style={{ width: '100%', height: '60px' }} action="/action_page.php">
              <select className="form-select" id="sel1" name="sellist1"  onChange={(event) => handleChange(event.target.value)}>
                <option> By Rating</option>
                <option value="1" >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
                <option value="4" >4</option>
                <option value="5" >5</option>
              </select>
            </form>
          </div>

        </div>
      </div>
      <div className="container pt-4">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6"></div>
        </div>
      </div>
      {showFilter  && <div className="container my-5 p-5 bbox">
        <div className="row"> 
          {filter && Object.keys(filter).map((key,index) => <div className="col-md-2" style={{padding: '11px'}}>
            <img src={`/pic/ct/${key}.png`} alt="" srcSet="" className="img-fluid" /><span className='filter-icon'></span>
            <span style={{ fontSize: '15px', fontWeight: '500' , position: 'relative', bottom:'5px', left: '2px'}}>{startCase(key)}</span>
            <form action="/action_page.php" className="pt-4">
            { filter[key].map((item,index) => <div className=""> 
            <input type="checkbox" className="form-check-input" id="check1" name="option1" value={filter[key][index]} 
            checked={filterObj[key] && filterObj[key].includes(filter[key][index])}  onChange={(event) => checkHandler(event,key)}/>
                <label className="form-check-label" htmlFor="check1">{item}</label>
              </div>)}
            </form>
          </div> )} 
          <div className="col-md-3"></div>
          <div className="col-md-3"></div>
        </div>
        <div className="row" style={{marginTop : '20px'}}>
          <div className="col-md-3">
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary btsk mt-3" onClick={clearFilter}>Clear All Filters</button>
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary btsk mt-3" onClick={getFilteredResults}>View Results</button>
          </div>
          <div className="col-md-3">
          </div>
        </div>
      </div>}

      <div className="container-fluid ">
        <hr style={{ border: '1px solid #F180AB', opacity: '1', marginTop: '0' }} className="mx-5 g-0" />

        <div className="justify-content-center mylove g-0 pt-3 px-5 pb-5">
          {subCatList && subCatList.map(item => <div className="categories"><span className={subCat == item ? 'borderme' : 'nonborderme'} onClick={() => setSubCat(item)}>{item}</span></div>)}
        </div>
        {list.length ? <div className="row justify-content-center g-4 p-5">

          {list && list.map(item => <div className="col-md-3 p-3">
            <div className="card justify-items-center ">
              <div className="card-img">
                <Link to={`/entity/${type}/${item._id}`}>
                  {item?.images?.length && <img src={baseUrl + item.images[0]} className="card-img-top img-fluid cat-img" />}
                </Link>
              </div>
              <div className="card-img-overlays " style={{ bottom: '27%', left: '10px' }}>
                <button type="button" className="btn btn-primary round">{(item.tag && item.tag.length) ? item.tag[0] : 'Primary'}</button>
              </div>
              <div style={{marginTop: '35px'}}>
              {Array.from({length: item.avgRating}, (_, i) => i + 1).map(item => <img style={{ marginRight: '5px'}} src="/pic/ct/str1.png" alt="star" srcSet="" width="20" className="img-fluid pt-3 star-img"/>)}
                {Array.from({length: 5 - (item.avgRating ? item.avgRating : 0)}, (_, i) => i + 1).map(item => <img style={{ marginRight: '5px'}} src="/pic/ct/str2.png" alt="star" srcSet="" width="20" className="img-fluid pt-3 star-img" />)}
              </div>
              <h4 style={{ fontWeight: '600', fontSize: '1.1rem', color: '#49516F' }} className="py-2">{item.name}</h4>
              <div style={{ display: 'flex', alignItems: 'center', color: '#49516F' }}>
                <img style={{ marginRight: '5px' }} src="/pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="12px" />
                <span style={{ fontSize: '0.8rem', fontWeight: '600' }} className="">{item.address}</span>
              </div>

            </div>
          </div>)}

        </div> : <div className="row"   style={{display: 'flex', justifyContent: 'center', fontSize:'36px', margin: '100px', fontWeight: '500'}}>{defaultmsg}</div>}




      </div>
      </div></>
  )
}

export default List;