import React, { useState, useRef, useEffect, useReducer } from "react";

import CardCreator from './components/CardCreator'
import CardList from './components/CardList'
import Footer from './components/Footer'
import Header from './components/Header'
import Overlay from './components/Overlay'

import deleteNote from "./actions/deleteNote";
import modifyNote from "./actions/modifyNote";
import addNote from './actions/addNote';

import PouchDB from "pouchdb";

import { Note } from "./types"

var db = new PouchDB('notes');

function App() {
    const [data, setData] = useState<Note[] | []>([]);
    const [overlayVisibility, setOverlayVisibility] = useState<boolean>(false);

    const deleteNoteBound   = deleteNote.bind(null, setData);
    const modifyNoteBound   = modifyNote.bind(null, setData);
    const addNoteBound      = addNote.bind(null, setData);

    //Mount
    useEffect(() => {
        db.allDocs({
            include_docs: true,
        }).then(result => {
            const newState: Note[] = result.rows.map(each => each.doc as Note);
            setData(newState);
        })
    }, [])

    return (
        <div className="flex flex-col h-screen w-screen overflow-x-hidden overflow-y-auto font-main">
            <Overlay overlayVisibility={overlayVisibility} />
            <Header />
            <CardList data={data} deleteNote={deleteNoteBound} modifyNote={modifyNoteBound} setOverlayVisibility={setOverlayVisibility} />
            <CardCreator addNote={addNoteBound} />
            <Footer totalNotes={data.length} />
        </div>
    );
}

export default App;
