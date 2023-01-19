import React, { useEffect, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from 'axios';
import {useSelector} from 'react-redux'
import { message } from "antd";
const Portfolio =()=>{
    const {_id} = useSelector(state=> state.user)
    const [userDetails, setUserDetails] = useState({})
    const fetchUserProfileDetails = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/profile/${_id}`)
        .then(res=> setUserDetails(res.data.user))
    
    }

    const avatarupload  = async (file) => {
        const formData = new FormData();
        formData.append("avatar", file);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/profile/${_id}`, {
            method: "POST",
            body: formData,
        })
        const data = await res.json()
        if(data.msg){
         message.success(data.msg)
        }
       
        if(res.status == 200){
            //rodo this code, 
            //disk storage-> 
            //delete if the user updates new profile picture : BE
            setTimeout(() => {
            fetchUserProfileDetails()
            }, 3000);
            
        }

        if(data.msg === 'successfully uploaded'){
            message.success(data.msg)         
        }
    }
 
   useEffect(()=>{
        fetchUserProfileDetails()
   },[])
   

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