import React from 'react'
import Modal from './Modal';

const ModalDelete = (props) => {
    return (<Modal
        titleText={"Weet je zeker dat je deze notitie wilt verwijderen?"}
        descriptionText={"Dit kan niet ongedaan worden gemaakt"}
        cancelText={"ANNULEREN"}
        confirmText={"VERDWIJDEREN"}
        confirmColorClassnames={"bg-red-500"}
        {...props}
    />)
}

export default ModalDelete;