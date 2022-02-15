import React from 'react'
import Card from './Card';
import Columns from "react-columns";

const CardList = ({ data, deleteNote, modifyNote, setOverlayVisibility }) => {

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

    return (
        <div className="CardList flex-1 bg-gray-100 py-8 px-4">
            <div className="container mx-auto">
                <Columns queries={columnQueries}>
                    {data.map((each, idx, arr) => {
                        return <Card {...each} key={"Card-" + idx} index={idx} deleteNote={deleteNote} modifyNote={modifyNote} setOverlayVisibility={setOverlayVisibility} />
                    })}
                </Columns>
            </div>
        </div>
    );
};

export default CardList;