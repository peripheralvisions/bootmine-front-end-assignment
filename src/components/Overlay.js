import React from 'react'

const Overlay = (props) => {
    return (
        <div className={`Overlay fixed z-40 bg-black/[.7]  w-screen h-screen top-0 left-0 ${props.overlayVisibility ? "" : "hidden"}`}>
            {props.children}
        </div>
    )
};

export default Overlay;