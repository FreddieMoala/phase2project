import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Styles.css';


export default function NavBar( {favoritesCount}) {
    console.log('NavBar rendered with count:', favoritesCount);
    // const [showNav, setShowNav] = useState(true);
    return(
        <React.Fragment>
            {/* {showNav && <NavBar />} */}
            <nav className="navbar">
                <div >
                <Link className="linkto" to="/">Get Another Beer</Link>
                <Link className="linkto" to="/favorites">Favorites ({favoritesCount})</Link>
                </div>
            </nav>
        </React.Fragment>
    );
}