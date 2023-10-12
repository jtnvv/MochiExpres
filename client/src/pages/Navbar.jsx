import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import * as FcIcons from "react-icons/fc";

const Navbar = () => {
    return (
        
        <div className="Navbar">
            <div className="Logo">
            <Link to="#" className="Logo">
                <FcIcons.FcInTransit/> 
            </Link> 
            </div>
        </div>
        
        
    );
};
export default Navbar;