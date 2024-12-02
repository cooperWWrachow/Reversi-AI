import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from './Sidebar';

const Navbar = () => {
    return (
        <div className="drawer">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <div className="navbar border-b-2 input-bordered p-5 relative flex justify-center items-center">
                    <div className="">
                        <h1 className="text-4xl tracking-widest font-thin">REVERSI</h1>
                    </div>
                    <div className="absolute left-3">
                        {/* Hamburger button triggers the drawer */}
                        <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost text-4xl">
                        <RxHamburgerMenu />
                        </label>
                    </div>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <Sidebar/>
                </ul>
            </div>
        </div>
    )
}

export default Navbar