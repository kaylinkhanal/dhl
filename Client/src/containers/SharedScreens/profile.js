import React, { useEffect, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { message, Skeleton } from "antd";
import axios from 'axios';
import {useSelector} from 'react-redux'
import DummyAvatar from '../../images/dummy_img.png'

const Portfolio =()=>{
    const {_id} = useSelector(state=> state.user)
    const [isUploaded, setIsUploaded] = useState(true)
    const [userDetails, setUserDetails] = useState({})
    const [loading, setLoading] = useState(false)
    // const userImg = DummyAvatar

    const avatarupload  = async (file) => {
        setIsUploaded(false)
        const formData = new FormData();
        formData.append("avatar", file);
        const data = await fetch(`${process.env.REACT_APP_BASE_URL}/profile/${_id}`, {
            method: "POST",
            body: formData,
        })
        if(data){
            message.success("uploaded")
            setIsUploaded(true)
        }

    }
    const fetchUserProfileDetails = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/profile/${_id}`)
        .then(res=> {
            setUserDetails(res.data.user)
            if(res.data.user){
                setLoading(true)
            }
        })
        
    }
   useEffect(()=>{
        fetchUserProfileDetails()
   },[isUploaded])
   

    return(
        <section>
            <div className="container">
                <div className="user_profile">
                    <div className="user_img">
                        {loading?
                        <img src={
                            require(`../../../src/uploads/${userDetails.avatarFileName || 'card_img.jpg'}`).default}alt="profile"  height={'100%'} width={'100%'}
                        />: <Skeleton.Avatar active size={200}/>}
                        
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