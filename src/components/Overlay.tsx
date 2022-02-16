import React from 'react'

interface Props {
    overlayVisibility: boolean,
    children?: React.ReactChildren
}

const Overlay: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div className={`Overlay fixed z-40 bg-black/[.7]  w-screen h-screen top-0 left-0 ${props.overlayVisibility ? "" : "hidden"}`}>
            {props.children}
        </div>
    )
};

export default Overlay;