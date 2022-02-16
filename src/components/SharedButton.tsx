import React from 'react'

interface Props {
    backgroundColorClass?: string,
    textColorClass?: string,
    children?: string,
    classNames?: string,
    onClick?: () => void,
}

const SharedButton:React.FunctionComponent<Props> = ({backgroundColorClass, textColorClass, onClick, children, classNames}: Props) => {
    return (
        <button className={`SharedButton ${backgroundColorClass} ${textColorClass} text-base text-white p-3 px-5 py-2 font-semibold rounded-md ${classNames}`} onClick={onClick}>{children}</button>
    );
};

export default SharedButton;