import React from "react";
import Navigation from "./navigation";
import Logo from '../../img/dhl.png';
import "../../../src/App.css";

const Header = ()=>{
    return(
        <div className="header">
            <div className="container">
                <div className="header_content">
                    <div className="logo" style={{width:"100px"}}><img src={Logo} alt=""/></div>

                    <Navigation/>
                </div>
            </div>
        </div>
    )
}
export default Header;