import React, { FunctionComponent } from 'react'
import Modal from './Modal';

interface Props {
    props: React.ComponentProps<any>,
}

const ModalDelete: FunctionComponent<Props> = (props: Props) => {
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