import React, { useState, useEffect } from "react";
import "./popup.css";

const PopUp = () => {

    const [ display, setDisplay] = useState("");


    const hidePopUp = ()=> {
        setDisplay("none");
    }

    return (
        <div id="popup" style={{ display: display }}>
            <div className="popup-card">
                <div className="popup-content col-lg-7 col-md-7 col-sm-12 p-3">
                    <div className="flex-div">
                    <h2>Download the Mobile App</h2>
                    <p>Get our Mobile App on your Phone for free</p>
                    <input type="phone" className="" placeholder="Enter phone number"  />                  
                    <div className="download-btns">
                            <div id='ctc' className="d-flex text-left col-sm-12 ctc" >
                                <div className="col-lg-8 col-md-8 col-sm-12 py-3 ">
                                    <button className="btn btsk1" >
                                        <i className="fa fa-chevron-circle-down" aria-hidden="true"></i> Download The App</button>

                                </div>

                                <div className="col-lg-2 col-md-2 col-sm-6  py-3 icons">
                                    {/* <img src="" alt="" sizes="" /> */}
                                    <img style={{}} src="pic/icon/ap.png" alt="" width="50%" className="img-fluid" />
                                </div>

                                <div className="col-lg-2 col-md-2 col-sm-6  py-3 icons">
                                    <img style={{}} src="pic/icon/an.png" alt="" width="50%" className="img-fluid" />

                                </div>
                            </div>
                    </div>
                    </div>
                </div>
                <div className="popup-img  col-lg-5 col-md-5">
                    <img src="pic/vendor-banner.png" alt="" sizes="" className="img-fluid popup-banner" />
                </div>
                <button onClick={ hidePopUp } className="exit-button">&times;</button>
            </div>
        </div>
    );
}

export default PopUp;