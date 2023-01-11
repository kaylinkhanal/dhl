import React from "react";
import Navigation from "./navigation";
import Logo from '../../images/dhl.png'

const Header = ()=>{
    return(
        <div className="header">
            <div className="container">
                <div className="header_content">
                    <div className="logo"><img src={Logo} alt=""/></div>

                    <Navigation/>
                </div>
            </div>
        </div>
    )
}
export default Header