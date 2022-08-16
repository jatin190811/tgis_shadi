import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Carosel from 'carousel-react-rcdev';

function Category() {

  const inputRef = useRef();
  const [categories, setCategories] = useState([]);
  const [slectedCat, setslectedCat] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const baseUrl = "http://146.190.30.14:8090/";

  useEffect(() => {
    getCategories('http://146.190.30.14:8090/api/v1/categories')
  }, [])

  const viewAllChange = event => {
    if(event.target?.value == 'Venue' || event == 'Venue') {
      navigate("/list/venues")
    }
    else if(event.target?.value == 'Makeup' || event == 'Makeup'){
      navigate("/list/makeup")
    }
    else if(event.target?.value == 'Bridal Wear' || event == 'Bridal Wear'){
      navigate("/list/bridalwear")
    }
    else if(event.target?.value == 'Groom Wear' || event == 'Groom Wear'){
      navigate("/list/groomwear")
    }
    else if(event.target?.value == 'Photographer' || event == 'Photographer'){
      navigate("/list/photographer")
    }
    else if(event.target?.value == 'Mehndi' || event == 'Mehndi'){
      navigate("/list/mehandi")
    }
    else if(event.target?.value == 'Decor' || event == 'Decor'){
      navigate("/list/decor")
    }
  }

  const getCategories = (url) => axios({
    method: 'GET',
    url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }).then((resp) => {
    console.log("resp", categories)
    if (resp.statusText == "OK") {
      if (resp.data.status == 'error') toast.error(resp.data.message, {});
      setCategories(resp.data.data);
    } else {

    }
  })
  const handleChange = event => {
    setSearchValue('');
    let val = event.target.value;
    if(val == 'Select Category') {
      val = 'all';
    }
    setslectedCat(val)
  }
  return (
    <>
      <div className="container-fluid  box-imgages" style={{ backgroundImage: 'url("pic/ct/banner.png")' }} >
        <div className="row">
          <div className="clo-lg-12 col-md-12 col-sm-12">

            {/* <h1 className="list-text text-white text-center">Venues</h1>
            <h4 className="text-white text-center">Home.Venues</h4> */}

          </div>

        </div>
      </div>

      <div className="" style={{paddingLeft: '55px', marginTop:'63px'}}>


        <div className="row">

          <div class="col-md-3 col-sm-12 px-3">
            <form action="#">

              <select class="form-select" id="sel1" name="sellist1" onChange={event => handleChange(event)} style={{fontFamily: 'Poppins',
fontStyle: 'normal'}}>
                <option> Select Category</option>
                <option onChange={event => handleChange(event)}>Venue</option>
                <option onChange={event => handleChange(event)}>Makeup</option>
                <option onChange={event => handleChange(event)}>Bridal Wear</option>
                <option onChange={event => handleChange(event)}>Groom Wear</option>
                <option onChange={event => handleChange(event)}>Photographer</option>
                <option onChange={event => handleChange(event)}>Mehndi</option>
                <option onChange={event => handleChange(event)}>Decor</option>
              </select>
            </form>
          </div>
          <div class="col-md-2 col-sm-12 px-3"></div>
          <div className="col-md-4 col-sm-12 px-3">

            <form className="example" style={{height: '62px'}} onSubmit={(event) => {
              event.preventDefault();
              setSearchValue(inputRef.current.value)
            }}>
              <input type="text" ref={inputRef} style={{height: '50px'}} placeholder="Search Category" name="search" />

              <button type="submit" style={{top: '0px'}}><i className="fa fa-search"></i></button>
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
      <div className="container-fluid ">
        {(slectedCat == 'all' || slectedCat == 'Venue') && categories?.venues?.filter(i => {
          if (!searchValue) return true;
          return String(i.subcategory).toLowerCase().match(String(searchValue))
        }).length != 0 && <div className="cat-listing">
            <h4><span style={{fontSize: '30px', fontWeight: '500', color:'#49516F',fontFamily: 'Poppins',
fontStyle: 'normal'}}>Venue</span><span style={{ color: '#f180ab',fontSize: '16px', paddingTop: '15px', float: 'right', paddingRight: '48px', cursor: 'pointer' }} onClick={() => viewAllChange('Venue')}>View All</span></h4>
            <hr style={{ color: '#f180ab', border: '1px solid', marginTop: '0px' }} className="mx-5 g-0" />
            <div className="row justify-content-center g-4 p-5">
              {categories?.venues && categories?.venues?.filter(i => {
                if (!searchValue) return true;

                return String(i.subcategory).toLowerCase().match(String(searchValue))
              }).map(item => <div className="col-md-3 p-3" style={{marginTop:'5px'}}>
                <div className="card justify-items-center ">
                  <div className="">
                    <Link to={`/list${item.url}`}>
                      <img src={baseUrl + item.image} className="card-img-top img-fluid cat-img" />
                    </Link>
                  </div>
                  <div className="card-img-overlays ">
                    {/* <button type="button" className="btn btn-primary round">{item.tag ? item.tag : 'Primary'}</button> */}
                  </div>
                  {/* <img src="pic/ct/st1.png" alt="star" srcSet="" width="150" className="img-fluid pt-3 star-img" /> */}
                  <h4 className="pt-2" style={{marginTop: '17px' ,paddingLeft: '1px',color: '#49516F'}}>{String(item.subcategory).split('_').map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(' ')}</h4>
                   {/* <img src="pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" /> */}
                  {/* <span className="mtext">{item.address}</span> */}

                </div>
              </div>)}
            </div>
          </div>}

        {(slectedCat == 'all' || slectedCat == 'Makeup') && categories?.makeup?.filter(i => {
          if (!searchValue) return true;

          return String(i.subcategory).toLowerCase().match(String(searchValue))
        }).length != 0 && <div className="cat-listing">
            <h4><span style={{fontSize: '30px', fontWeight: '500', color:'#49516F'}}>Makeup</span> <span style={{ color: '#f180ab',fontSize: '16px', float: 'right',paddingTop: '15px', float: 'right', paddingRight: '48px',cursor: 'pointer' }} onClick={() => viewAllChange('Makeup')}>View All</span></h4>
            <hr style={{ color: '#f180ab', border: '1px solid' }} className="mx-5 g-0" />
            <div className="row justify-content-center g-4 p-5">
              {categories?.makeup && categories?.makeup?.filter(i => {
                if (!searchValue) return true;

                return String(i.subcategory).toLowerCase().match(String(searchValue))
              }).map(item => <div className="col-md-3 p-3" style={{marginTop:'5px'}}>
                <div className="card justify-items-center ">
                  <div className="">
                    <Link to={`/list${item.url}`}>
                      <img src={baseUrl + item.image} className="card-img-top img-fluid cat-img" />
                    </Link>
                  </div>
                  <div className="card-img-overlays ">
                    {/* <button type="button" className="btn btn-primary round">{item.tag ? item.tag : 'Primary'}</button> */}
                  </div>
                  {/* <img src="pic/ct/st1.png" alt="star" srcSet="" width="150" className="img-fluid pt-3 star-img" /> */}
                  <h4 className="pt-2" style={{marginTop: '17px' ,paddingLeft: '1px',color: '#49516F'}}>{String(item.subcategory).split('_').map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(' ')}</h4>
                   {/* <img src="pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" /> */}
                  {/* <span className="mtext">{item.address}</span> */}

                </div>
              </div>)}
            </div>
          </div>}

        {(slectedCat == 'all' || slectedCat == 'Bridal Wear') && categories?.bridalwear?.filter(i => {
          if (!searchValue) return true;
          return String(i.subcategory).toLowerCase().match(String(searchValue))
        }).length != 0 && <div className="cat-listing">
            <h4 ><span style={{fontSize: '30px', fontWeight: '500', color:'#49516F'}}>Bridal Wear</span><span style={{ color: '#f180ab',fontSize: '16px', float: 'right',paddingTop: '15px', float: 'right', paddingRight: '48px',cursor: 'pointer' }} onClick={() => viewAllChange('Bridal Wear')}>View All</span></h4>
            <hr style={{ color: '#f180ab', border: '1px solid' }} className="mx-5 g-0" />
            <div className="row justify-content-center g-4 p-5">
              {categories?.bridalwear && categories?.bridalwear?.filter(i => {
                if (!searchValue) return true;

                return String(i.subcategory).toLowerCase().match(String(searchValue))
              }).map(item => <div className="col-md-3 p-3" style={{marginTop:'5px'}}>
                <div className="card justify-items-center ">
                  <div className="">
                    <Link to={`/list${item.url}`}>
                      <img src={baseUrl + item.image} className="card-img-top img-fluid cat-img" />
                    </Link>
                  </div>
                  <div className="card-img-overlays ">
                    {/* <button type="button" className="btn btn-primary round">{item.tag ? item.tag : 'Primary'}</button> */}
                  </div>
                  {/* <img src="pic/ct/st1.png" alt="star" srcSet="" width="150" className="img-fluid pt-3 star-img" /> */}
                  <h4 className="pt-2" style={{marginTop: '17px' ,paddingLeft: '1px',color: '#49516F'}}>{String(item.subcategory).split('_').map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(' ')}</h4>
                   {/* <img src="pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" /> */}
                  {/* <span className="mtext">{item.address}</span> */}

                </div>
              </div>)}
            </div>
          </div>}

        {(slectedCat == 'Groom Wear' || slectedCat == 'all') && categories?.groomwear?.filter(i => {
          if (!searchValue) return true;

          return String(i.subcategory).toLowerCase().match(String(searchValue))
        }).length != 0 && <div className="cat-listing">
            <h4><span style={{fontSize: '30px', fontWeight: '500', color:'#49516F'}}>Groom Wear</span><span style={{ color: '#f180ab',fontSize: '16px', float: 'right',paddingTop: '15px', float: 'right', paddingRight: '48px',cursor: 'pointer' }} onClick={() => viewAllChange('Groom Wear')}>View All</span></h4>
            <hr style={{ color: '#f180ab', border: '1px solid' }} className="mx-5 g-0" />
            <div className="row justify-content-center g-4 p-5">
              {categories?.groomwear && categories?.groomwear?.filter(i => {
                if (!searchValue) return true;

                return String(i.subcategory).toLowerCase().match(String(searchValue))
              }).map(item => <div className="col-md-3 p-3" style={{marginTop:'5px'}}>
                <div className="card justify-items-center ">
                  <div className="">
                    <Link to={`/list${item.url}`}>
                      <img src={baseUrl + item.image} className="card-img-top img-fluid cat-img" />
                    </Link>
                  </div>
                  <div className="card-img-overlays ">
                    {/* <button type="button" className="btn btn-primary round">{item.tag ? item.tag : 'Primary'}</button> */}
                  </div>
                  {/* <img src="pic/ct/st1.png" alt="star" srcSet="" width="150" className="img-fluid pt-3 star-img" /> */}
                  <h4 className="pt-2" style={{marginTop: '17px' ,paddingLeft: '1px',color: '#49516F'}}>{String(item.subcategory).split('_').map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(' ')}</h4>
                   {/* <img src="pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" /> */}
                  {/* <span className="mtext">{item.address}</span> */}

                </div>
              </div>)}
            </div>
          </div>}

        {(slectedCat == 'Photographer' || slectedCat == 'all') && categories?.photographer?.filter(i => {
          if (!searchValue) return true;

          return String(i.subcategory).toLowerCase().match(String(searchValue))
        }).length != 0 && <div className="cat-listing">
            <h4><span style={{fontSize: '30px', fontWeight: '500', color:'#49516F'}}>Photographer</span><span style={{ color: '#f180ab',fontSize: '16px', float: 'right',paddingTop: '15px', float: 'right', paddingRight: '48px',cursor: 'pointer' }} onClick={() => viewAllChange('Photographer')}>View All</span></h4>
            <hr style={{ color: '#f180ab', border: '1px solid' }} className="mx-5 g-0" />
            <div className="row justify-content-center g-4 p-5">
              {categories?.photographer && categories?.photographer?.filter(i => {
                if (!searchValue) return true;

                return String(i.subcategory).toLowerCase().match(String(searchValue))
              }).map(item => <div className="col-md-3 p-3" style={{marginTop:'5px'}}>
                <div className="card justify-items-center ">
                  <div className="">
                    <Link to={`/list${item.url}`}>
                      <img src={baseUrl + item.image} className="card-img-top img-fluid cat-img" />
                    </Link>
                  </div>
                  <div className="card-img-overlays ">
                    {/* <button type="button" className="btn btn-primary round">{item.tag ? item.tag : 'Primary'}</button> */}
                  </div>
                  {/* <img src="pic/ct/st1.png" alt="star" srcSet="" width="150" className="img-fluid pt-3 star-img" /> */}
                  <h4 className="pt-2" style={{marginTop: '17px' ,paddingLeft: '1px',color: '#49516F'}}>{String(item.subcategory).split('_').map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(' ')}</h4>
                   {/* <img src="pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" /> */}
                  {/* <span className="mtext">{item.address}</span> */}

                </div>
              </div>)}
            </div>
          </div>}

        {(slectedCat == 'Mehndi' || slectedCat == 'all') && categories?.mehandi?.filter(i => {
          if (!searchValue) return true;

          return String(i.subcategory).toLowerCase().match(String(searchValue))
        }).length != 0 && <div className="cat-listing">
            <h4><span style={{fontSize: '30px', fontWeight: '500', color:'#49516F'}}>Mehndi</span><span style={{ color: '#f180ab', fontSize: '16px',float: 'right',paddingTop: '15px', float: 'right', paddingRight: '48px',cursor: 'pointer' }} onClick={() => viewAllChange('Mehndi')}>View All</span></h4>
            <hr style={{ color: '#f180ab', border: '1px solid' }} className="mx-5 g-0" />
            <div className="row justify-content-center g-4 p-5">
              {categories?.mehandi && categories?.mehandi?.filter(i => {
                if (!searchValue) return true;

                return String(i.subcategory).toLowerCase().match(String(searchValue))
              }).map(item => <div className="col-md-3 p-3" style={{marginTop:'5px'}}>
                <div className="card justify-items-center ">
                  <div className="">
                    <Link to={`/list${item.url}`}>
                      <img src={baseUrl + item.image} className="card-img-top img-fluid cat-img" />
                    </Link>
                  </div>
                  <div className="card-img-overlays ">
                    {/* <button type="button" className="btn btn-primary round">{item.tag ? item.tag : 'Primary'}</button> */}
                  </div>
                   {/* <img src="pic/ct/st1.png" alt="star" srcSet="" width="150" className="img-fluid pt-3 star-img" /> */} 
                  <h4 className="pt-2" style={{marginTop: '17px' ,paddingLeft: '1px',color: '#49516F'}}>{String(item.subcategory).split('_').map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(' ')}</h4>
                   {/* <img src="pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" /> */} 
                   {/* <span className="mtext">{item.address}</span> */} 

                </div>
              </div>)}
            </div>
          </div>}

        {(slectedCat == 'Decor' || slectedCat == 'all') && categories?.decor?.filter(i => {
          if (!searchValue) return true;

          return String(i.subcategory).toLowerCase().match(String(searchValue))
        }).length != 0 && <div className="cat-listing">
            <h4><span style={{fontSize: '30px', fontWeight: '500', color:'#49516F'}}>Decor</span><span style={{ color: '#f180ab',fontSize: '16px', float: 'right',paddingTop: '15px', float: 'right', paddingRight: '48px',cursor: 'pointer' }} onClick={() => viewAllChange('Decor')}>View All</span></h4>
            <hr style={{ color: '#f180ab', border: '1px solid' }} className="mx-5 g-0" />
            <div className="row justify-content-center g-4 p-5">
              {categories?.decor && categories?.decor?.filter(i => {
                if (!searchValue) return true;

                return String(i.subcategory).toLowerCase().match(String(searchValue))
              }).map(item => <div className="col-md-3 p-3" style={{marginTop:'5px'}}>
                <div className="card justify-items-center ">
                  <div className="">
                    <Link to={`/list${item.url}`}>
                      <img src={baseUrl + item.image} className="card-img-top img-fluid cat-img" />
                    </Link>
                  </div>
                  <div className="card-img-overlays ">
                    {/* <button type="button" className="btn btn-primary round">{item.tag ? item.tag : 'Primary'}</button> */}
                  </div>
                  {/* <img src="pic/ct/st1.png" alt="star" srcSet="" width="150" className="img-fluid pt-3 star-img" /> */}
                  <h4 className="pt-2" style={{marginTop: '17px' ,paddingLeft: '1px',color: '#49516F'}}>{String(item.subcategory).split('_').map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(' ')}</h4>
                   {/* <img src="pic/Vector.png" alt="loccationn" srcSet="" className="img-fluid locat" width="15px" /> */}
                  {/* <span className="mtext">{item.address}</span> */}

                </div>
              </div>)}
            </div>
          </div>}


      </div></>
  )
}

export default Category;