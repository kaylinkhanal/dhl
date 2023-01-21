import React, { useEffect, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { message } from "antd";

const Portfolio =()=>{
    const [userDetail, setUserDetail] = useState([])
    const {_id} = useSelector(state=> state.user)

    const fetchUser = async()=>{
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/profile/${_id}`)
        const data = await response.json()
        // console.log(data)

        if(data){
            setUserDetail(data.user)
        }else{
            console.log('user not found')
        }
    }

    useEffect(()=>{
        fetchUser()
    }, [_id])

    const uploadavatar = async(file)=>{
        // console.log(file)
        let formData = new FormData(); 
        formData.append('avatar', file);
        const data = await fetch (`${process.env.REACT_APP_BASE_URL}/profile/${_id}`, {
            method: "POST",
            body: formData,
        })

        if(data){
            message.success('avatar uploaded')
        }
    }

    return(
        <section>
            <div className="container">
                <div className="user_profile">
                    <div className="user_img">
                        <img src={
                            userDetail.avatarFile ? require( '../../uploads/' + userDetail.avatarFile ) : 
                            require( '../../images/dummy_img.png').default
                            } alt="profile"  height={'100%'} width={'100%'}
                        />
                        
                        <div className="uploader">
                            <input type="file" id="upload" onChange={(e)=> uploadavatar(e.target.files[0])} hidden/>
                            <label htmlFor="upload"><FaCamera/></label>
                        </div>
                    </div>
                    
                    <div className="user_detail">
                        <h1>{userDetail.name}</h1>
                        <p>{userDetail.email}</p>
                        <p>{userDetail.permanentAddress}, {userDetail.country}</p>
                    </div>

                    {/* <div className="user_edit">
                        <FaPencilAlt/> Edit Details
                    </div> */}
                </div>
            </div>
        </section>
    )
}
export default Portfolio