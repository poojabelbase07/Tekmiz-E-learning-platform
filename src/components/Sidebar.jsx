import React from "react";
import "./Sidebar.css";
// Sidebar section list
function Sidebar() {

    return(
    // Home Dashboard About Teacher Contact us
        <div className="sidebar">
         <ul>
        <li>Home</li>
        <li>Dashboard</li>
        <li>About</li>
        <li>Teacher</li>
        <li>Contact us</li>
        </ul>
        </div>

    );
}

export default Sidebar;





