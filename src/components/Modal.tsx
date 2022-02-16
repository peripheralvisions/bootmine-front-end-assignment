import React, { FunctionComponent } from 'react';
import Overlay from './Overlay';
import SharedButton from './SharedButton';

interface Props {
    titleText?: string,
    descriptionText?: string,
    cancelText?: string,
    confirmText?: string,
    confirmColorClassnames?: string,
    resolve?: any,
    reject?: any,
}

const Modal: FunctionComponent<Props> = ({titleText, descriptionText, cancelText = "CANCEL", confirmText = "OK", confirmColorClassnames, resolve, reject }: Props) => {
    return (
        <div>
            <Overlay overlayVisibility={true} />
            <div className="Modal flex w-screen h-screen justify-center items-center fixed top-0 left-0 z-50 p-8">
                <div className="flex flex-col text-gray-500 text-lg bg-white text-center space-y-4 sm:space-y-8 p-6 sm:p-12 rounded-md">
                    <h2 className="text-md sm:text-2xl font-semibold">{titleText}</h2>
                    <p className="text-gray-500 text-sm sm:text-lg block">{descriptionText}</p>
                    <div className="Modal__buttons flex justify-center space-x-4 text-white">
                        <SharedButton backgroundColorClass="bg-gray-600" textColorClass="white" onClick={() => reject()}>{cancelText}</SharedButton>
                        <SharedButton backgroundColorClass="bg-red-500" textColorClass="white" onClick={() => resolve()}>{confirmText}</SharedButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;