import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrackingContext } from "./Context/TrackingContext";

const Navbar = () => {
  const { currentUser, connectWallet, getShipmentsCount } =
    useContext(TrackingContext);
  const [count, setCount] = useState();

  useEffect(() => {
    const getShipmentsData = async () => {
      const allData = await getShipmentsCount();
      setCount(allData);
    };
    getShipmentsData();
  }, [getShipmentsCount]);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/get-shipment">Get Shipment</Link>
              </li>
              <li>
                <Link to="/table">Tracking Log</Link>
              </li>
              <li>
                <Link to="/verify-product">Verify Product</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl" href="/">
            Chain Flow
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/get-shipment">Get Shipment</Link>
            </li>
            <li>
              <Link to="/table">Tracking Logs</Link>
            </li>
            <li>
              <Link to="/verify-product">Verify Product</Link>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Creator Profile" src="/creator9.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between" href="/">
                  Profile : {currentUser.slice(0, 14)}...
                </a>
              </li>
              <li>
                <a href="/">Total Shipments : {count} </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          {currentUser ? (
            <p>{currentUser.slice(0, 20)}...</p>
          ) : (
            <button className="btn" onClick={() => connectWallet()}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
