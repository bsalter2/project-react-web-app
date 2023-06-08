import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationSidebar = () => {
    const { pathname } = useLocation();
    const [ignore, active] = pathname.split("/");
    const links = ["home", "search", "details", "profile", "login"];
    return (
        <div className='container'>
            <div className="list-group">
                {links.map((link) =>
                    <Link to={`/${link}`} className={`list-group-item text-capitalize ${active === link ? "active" : ""}`}>
                        {link}
                    </Link>
                )}
            </div>
        </div>

    );
};
export default NavigationSidebar;