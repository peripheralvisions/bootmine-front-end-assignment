import React from 'react'

const SharedButton = ({backgroundColorClass, textColorClass, onClick, children, classNames}) => {
    return (
        <button className={`SharedButton ${backgroundColorClass} ${textColorClass} text-base text-white p-3 px-5 py-2 font-semibold rounded-md ${classNames}`} onClick={onClick}>{children}</button>
    );
};

export default SharedButton;