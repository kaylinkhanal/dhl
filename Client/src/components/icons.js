import React, {useState, useEffect} from 'react'
import {CiLocationOn} from 'react-icons/ci'

 const  LocationIcon = (props) => {
    const [locationIcon, setLocationIcon] = useState()

        setLocationIcon(<CiLocationOn/>)
   

    return(
    <div className="input_wrap">


            <input type={locationIcon ? 'text' : ''} placeholder={props.placeholder} {...props.field}></input>
        </div>
    
    )
}
export default LocationIcon;