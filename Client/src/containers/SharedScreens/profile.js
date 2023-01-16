import React, { useEffect, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Portfolio =()=>{
    const [userDetail, setUserDetail] = useState({})
    const params = useParams()
    const {name} = params
    console.log(userDetail)

    const getUser = async()=>{
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/profile/${name}`)
        const data = await response.json()

        if(data){
            setUserDetail(data.user)
        }else{
            alert('user details not found')
        }
    }

    useEffect(()=>{
        getUser()
    },[name])

    return(
        <section>
            <div className="container">
                <div className="user_profile">
                    <div className="user_img">
                        <img src={require('../../../src/uploads/card_img.jpg').default} alt="profile" height={'100%'} width={'100%'}/>
                        
                        <div className="uploader">
                            <input type="file" id="upload" hidden/>
                            <label htmlFor="upload"><FaCamera/></label>
                        </div>
                    </div>
                    
                    <div className="user_detail">
                        <h3>{userDetail.name}</h3>
                        <p>{userDetail.email}</p>
                        <p>{userDetail.permanentAddress}, {userDetail.country}</p>
                    </div>

                    <div className="user_edit">
                        <FaPencilAlt/> Edit Details
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Portfolio