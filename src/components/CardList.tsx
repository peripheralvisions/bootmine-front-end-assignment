import React from 'react'
import Card from './Card';
import Columns from "react-columns";

import { Note } from "./../types"

interface Props {
    data: any[] | Note[],
    modifyNote: (_id: string, index: number, newContents: {title: string, description: string}) => void,
    deleteNote: (_id: string, index: number) => void,
    setOverlayVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

const CardList: React.FunctionComponent<Props> = ({data, modifyNote, deleteNote, setOverlayVisibility}: Props) => {

    const columnQueries = [
        {
            columns: 1,
            query: "min-width: 100px"
        },

        {
            columns: 3,
            query: "min-width: 1000px"
        },
    ]

    const Cards = (data.map((each: React.ComponentProps<any>, idx: number) => {
        return <Card {...each} key={"Card-" + idx} index={idx} deleteNote={deleteNote} modifyNote={modifyNote} setOverlayVisibility={setOverlayVisibility} />
    }));

    return (
        <div className="CardList flex-1 bg-gray-100 py-8 px-4">
            <div className="container mx-auto">
                <Columns  queries={columnQueries}>
                    {Cards}
                </Columns>
            </div>
        </div>
    );
};

export default CardList;    