import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Styles.css';


export default function NavBar() {
    // const [showNav, setShowNav] = useState(true);
    return(
        <React.Fragment>
            {/* {showNav && <NavBar />} */}
            <nav className="navbar">
                <div >
                <Link className="linkto" to="/">Exit</Link>
                <Link className="linkto" to="/favorites">Favorites</Link>
                <Link className="linkto" to="/beer_gen">Get Another Beer</Link>
                </div>
            </nav>
        </React.Fragment>
    );
}