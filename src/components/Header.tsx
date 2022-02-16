import React from 'react'

import bootmineLogo from "./../svg/Bootmine-logo.svg";

const Header = () => {
    return (
        <div className="Header flex shrink-0 justify-center items-center text-lg h-20 bg-black text-white">
            <img src={bootmineLogo} className="h-10" alt="bootmine-logo" />
        </div>
    );
};

export default Header;