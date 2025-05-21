// REACT 
import React from "react";
import { Link, useLocation } from "react-router-dom";
// ICONS
import { House } from "lucide-react"
import Logo from "../../Logo";

function AuthHeader() {

    const { pathname } = useLocation();

    const hideHomeIconPath = ["/", "/login", "/signup"];
    const displayHomeIcon = !hideHomeIconPath.includes(pathname);

    return (
        <div className="px-5 py-2.5 md:py-3 md:px-14 border-b-2 border-gray-300 flex items-center justify-between">

            {/* LOGO */}
            <Logo />

            {/* HOME ICON */}
            {displayHomeIcon &&
                <Link to="/">
                    <House />
                </Link>
            }

        </div>
    )
}

export default AuthHeader;