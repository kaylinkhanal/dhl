import React, { useEffect, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from 'axios';
import {useSelector} from 'react-redux'
const Portfolio =()=>{
    const {_id} = useSelector(state=> state.user)
    const [isUploaded, setIsUploaded] = useState(true)
    const [userDetails, setUserDetails] = useState({})
    const avatarupload  = async (file) => {
        setIsUploaded(false)
        const formData = new FormData();
        formData.append("avatar", file);
        const data = await fetch(`${process.env.REACT_APP_BASE_URL}/profile/${_id}`, {
            method: "POST",
            body: formData,
        })
        if(data){
            alert("uploaded")
            setIsUploaded(true)
        }

    }
   //task
   // useEffect->  fetch -> localhost:5000/profile/63bb8b2fa2db5d18a67d744b
   //-> data.user.avatarFileName
   //save it into a state
    const fetchUserProfileDetails = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/profile/${_id}`)
        .then(res=> setUserDetails(res.data.user))
    }

   useEffect(()=>{
        fetchUserProfileDetails()
   },[isUploaded])
   

    return(
        <section>
            <div className="container">
                <div className="user_profile">
                    <div className="user_img">
                        <img src={require(`../../../src/uploads/${userDetails.avatarFileName || 'card_img.jpg'}`).default} alt="profile" height={'100%'} width={'100%'}/>
                        
                        <div className="uploader">
                            <input onChange={(e)=> avatarupload(e.target.files[0])} type="file" id="upload" hidden/>
                            <label htmlFor="upload"><FaCamera/></label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Portfolio