import PouchDB from "pouchdb";
import React from "react";

var db = new PouchDB('notes');

import { Note } from "./../types"

function addNote(setData: React.Dispatch<React.SetStateAction<Note[] | []>>, noteObject: {title: string, description: string}):void {

    var newNote: Note = {
        _id: new Date().toISOString(),
        title: noteObject.title,
        description: noteObject.description
    };

    db.put(newNote);

    setData(prevState => {
        let temp: Note[] = [...prevState];
        temp.push(newNote);
        return temp;
    });
}

export default addNote;