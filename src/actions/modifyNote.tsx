import React, { ReactText } from "react";
import { Note } from "./../types"

import PouchDB from "pouchdb";
var db = new PouchDB('notes');

//Modify
function modifyNote(setData: React.Dispatch<React.SetStateAction<Note[] | []>>,
    id: string,
    arrIndex: number,
    newContents: { title: string, description: string }) {
    db
    .get(id)
    .then(function (doc) {
        return db.put({
            _id: doc._id,
            _rev: doc._rev,
            title: newContents.title,
            description: newContents.description,
        });
    });

    setData((prevState: Note[]) => {
        let temp = [...prevState];
        temp[arrIndex].title = newContents.title;
        temp[arrIndex].description = newContents.description;
        return temp as Note[];
    })
}

export default modifyNote;