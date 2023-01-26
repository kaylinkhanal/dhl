import React from 'react'
import { FaSearch } from "react-icons/fa";

const Search = (props)=>{
    console.log(props)
    return(
        <>
        <div className='search'>
            <input type="search" placeholder='Search Orders.....' onKeyUp={(e)=> props.fetchData(1, 5, e.target.value)}></input>
        </div>
        </>
    )
}
export default Search