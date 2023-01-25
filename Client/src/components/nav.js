import React, {useState} from "react";
import NavChildren from "./navChildren"

const Nav = (setKey) => {
  const [userDetails,setUserDetails] = useState('')

  return (
    <>
    {userDetails}
      <NavChildren  setUserDetails={setUserDetails} />
    </>
  );
};
export default Nav;

