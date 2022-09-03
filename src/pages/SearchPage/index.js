import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import { Link,useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { startCase } from 'lodash';


function SearchPage() {

  const [list, setList] = useState([]);
  const [message, setMessage] = useState([]);
  const [filter, setFilter] = useState({});
  const [filterObj, setFilterObj] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [subCatList, setSubCatList] = useState([]);
  const [subCat, setSubCat] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(null);
  const [selectValue, setSelectValue] = useState('');
  const baseUrl = "http://134.209.153.76:8090/";

  let { type } = useParams();
  let type1 = type;
  if(type == 'makeup')
	type1 = 'bridal-makeups';
  else if(type == 'bridalwear')
  type1 =  'bridal-wears';
  else if(type == 'groomwear')
  type1 =  'groom';
  else if(type == 'photographer')
  type1 =  'photographers';
  else if(type == 'mehandi')
  type1 =  'mehndi';
  else if(type == 'decor')
  type1 =  'planner';

//   useEffect(() => {
//     getCategories(`http://134.209.153.76:8090/api/v1/${type1}`)
//   }, [])

//   useEffect(() => {
//     getCategories(`http://134.209.153.76:8090/api/v1/${type1}`)
//   }, [subCat])
//   useEffect(() => {
//     if(Object.keys(filterObj).length == 0) 
//     getCategories(`http://134.209.153.76:8090/api/v1/${type1}`)
//   }, [filterObj])
//   useEffect(() => {
//     getCategories(`http://134.209.153.76:8090/api/v1/${type1}`)
//   }, [rating])

  const getCategories = (url) => axios({
    method: 'POST',
    url,
    headers: {
      'content-type': (Object.keys(filterObj).length || searchValue || subCat) ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8'
    },
    data: {
      searchkey: searchValue ? searchValue : null,
    }
  }).then((resp) => {
    if (resp.statusText == "OK") {
      if (resp.data.status == 'error') toast.error(resp.data.message, {});
      setList(resp.data.data);
      setMessage(resp.data.message)
      if(resp.data && resp.data.filters && resp.data.filters.filters) {
       
      }
      else {
        setFilter([])
      }
    } else {

    }
  })
  
  const handleChange = (value) => {
    setSelectValue(value);
    setRating(value);
    
    
  }
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
  getCategories(`http://134.209.153.76:8090/api/v1/search`)
   
  }
  const clearFilter = () => {
    setFilterObj({});
    }

  // console.log(Object.entries(filter))
  return (
    <>
    <div>
      {/* <div className="container-fluid  box-imgages" style={{ backgroundImage: 'url("/pic/ct/banner.png")' }} >
        <div className="row">
          <div className="clo-lg-12 col-md-12 col-sm-12">

            <h1 className="list-text text-white text-center">Venues</h1>
            <h4 className="text-white text-center">Home.Venues</h4>

          </div>

        </div>
      </div> */}

      <div className="mt-5">


        <div className="row" style={{marginLeft: '4%'}}>

         {message && <div className="col-md-3 col-sm-12 py-3">
            <p><b>{message}</b> </p>
          </div>}

          {/* <div className="col-md-2 col-sm-12 py-3 text-center">

          <span style={{cursor:'pointer'}} onClick={() => setShowFilter(!showFilter)}><img src="/pic/icon/vector.png" alt="" srcSet="" className="img-fluid" />
            Filters</span>
          </div> */}
          <div className="col-md-1"></div>
          <div className="col-md-4 col-sm-12 px-3">
            <form className="example" style={{height: '60px'}} onSubmit={(event) => event.preventDefault()} >
              <input type="text" placeholder="Search name or location.." style={{height: '45px'}} name="search" onChange={(event)=> setSearchValue(event.target.value)}/>
              <button style={{top:'0'}}><i className="fa fa-search" onClick={getFilteredResults}></i></button>
            </form>
          </div>

          <div className="col-md-2 col-sm-12 px-3">
            {/* <form action="/action_page.php">
              <select className="form-select" id="sel1" name="sellist1" value={selectValue} onChange={(event) => handleChange(event.target.value)}>
                <option> By relevance</option>
                <option value="1" >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
                <option value="4" >4</option>
                <option value="5" >5</option>
              </select>
            </form> */}
          </div>

        </div>
      </div>
      <div className="container pt-4">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6"></div>
        </div>
      </div>
      {/* {showFilter  && <div className="container my-5 p-5 bbox">
        <div className="row"> 
          {filter && Object.keys(filter).map((key,index) => <div className="col-md-2" >
            <img src={`/pic/ct/${key}.png`} alt="" srcSet="" className="img-fluid" /><span className='filter-icon'></span>
            <span style={{ fontSize: '15px', fontWeight: '500' , position: 'relative', bottom:'5px', left: '2px'}}>{startCase(key)}</span>
            <form action="/action_page.php" className="pt-4">
            { filter[key].map((item,index) => <div className=""> 
            <input type="checkbox" className="form-check-input" id="check1" name="option1" value={filter[key][index]} checked={filterObj[key] && filterObj[key].includes(filter[key][index])}  onChange={(event) => checkHandler(event,key)}/>
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
      </div>} */}

      <div className="container-fluid ">
        <hr style={{ color: '#f180ab', border: '1px solid' }} className="mx-5 g-0" />

        {/* <div className="row justify-content-center mylove g-0 p-5">
          {subCatList && subCatList.map(item => <div className="col-2 float-end "><span className={subCat == item ? 'borderme' : 'nonborderme'} onClick={() => setSubCat(item)}>{item}</span></div>)}
        </div> */}
        {list && list.length ? <div className="row justify-content-center g-4 p-5">

          {list && list.map(item => <div className="col-md-3 p-3">
            <div className="card justify-items-center ">
              <div className="card-img">
                <Link to={`/entity/${item.type}/${item._id}`}>
                  <img src={baseUrl + item.images[0]} className="card-img-top img-fluid cat-img" />
                </Link>
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

        </div> : <div className="row"   style={{display: 'flex', justifyContent: 'center', fontSize:'36px', margin: '100px', fontWeight: '500'}}>Try Searching!</div>}




      </div>
      </div></>
  )
}

export default SearchPage;