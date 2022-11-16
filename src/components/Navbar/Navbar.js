import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";
import {useNavigate} from "react-router-dom";

/**
 * Creates the nav bar allowing the user to switch from tab to tab.
 * @returns The nav bar.
 */
const Navbar = () => {

    const navigate = useNavigate();

    /**
     * Refresh Page
     */
    function reset(){
        navigate('/TypefrogPage');
        window.location.reload();
    }

    /**
     * Renders Navbar
     */
    return (
        <>
            <div
                style={{
                    background: '#00b141',
                    height: '3px',
                }}
            />
            <Nav>
                <NavMenu>
                    <NavLink to="/TypefrogPage" onClick={() => {reset()}}>
                        Home
                    </NavLink>
                    <NavLink to="TypefrogPage/prompts" >
                        Prompts
                    </NavLink>
                    <NavLink to="TypefrogPage/about" >
                        About
                    </NavLink>
                    <NavLink to="TypefrogPage/profile" >
                        Profile
                    </NavLink>
                    <NavLink to="TypefrogPage/merch" >
                        Merch
                    </NavLink>
                </NavMenu>
            </Nav>
            <div
                style={{
                    background: '#00b141',
                    height: '3px',
                }}
            />
        </>
    );
};

export default Navbar;