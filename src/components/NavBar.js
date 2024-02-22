import React from "react";

const NavBar = () => {
  return (
    <>
      <div className="flex items-center justify-between ">
        <div className="flex items-center ml-10">
          <div className="btn btn-ghost text-2xl text-black font-extrabold font-sans">
            STAR WARS
          </div>
        </div>
        <div className="flex m-1">
          <div className="btn btn-ghost m-1 font-bold text-black text-xl rounded-full"></div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
