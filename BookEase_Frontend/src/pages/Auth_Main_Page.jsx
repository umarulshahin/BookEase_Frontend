import React, { useState } from "react";
import Background_img from "../assets/Auth_page_Background.jpg";
import Login from "../Components/Login";
import Registration from "../Components/Registration";
import { useSelector } from "react-redux";

const Auth_Main_Page = () => {
  const isLogin = useSelector((state)=>state.userdata.isLogin)
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <img
        className="w-full h-full object-cover"
        src={Background_img}
        alt="Background"
      />
      
      {/* Login Component */}
      <div className="absolute inset-0 flex md:mr-48  justify-end  items-center">

        {isLogin ? <><Login /> </>: <><Registration /></>}
      </div>
    </div>
  );
};

export default Auth_Main_Page;
