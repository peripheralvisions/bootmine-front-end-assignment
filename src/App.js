import React, { useState, useRef, useEffect, useReducer } from "react";

import CardCreator from './components/CardCreator'
import CardList from './components/CardList'
import Footer from './components/Footer'
import Header from './components/Header'
import ModalDelete from './components/ModalDelete'
import Overlay from './components/Overlay'

import modalConfirm from './actions/modalConfirm'

import PouchDB from "pouchdb";

var db = new PouchDB('notes');

function App() {
    const [data, setData] = useState([]);
    const [overlayVisibility, setOverlayVisibility] = useState(false);

    //Add
    function addNote(noteObject) {
        var newNote = {
            _id: new Date().toISOString(),
            title: noteObject.title,
            description: noteObject.description
        };

        db.put(newNote, function callback(err, result) {
            if (!err) {
                setData(prevState => {
                    let temp = [...prevState];
                    temp.push(newNote);
                    return temp;
                });
            }
        });
    }

    //Delete
    function deleteNote(id, arrIndex) {
        modalConfirm(ModalDelete)()
            .then(() => {
                db.get(id).then(function (doc) {
                    return db.remove(doc);
                });

                setData(prevState => {
                    let temp = [...prevState];
                    temp.splice(arrIndex, 1);
                    return temp;
                })
            })
    }

    //Modify
    function modifyNote(id, arrIndex, newContents) {
        db.get(id).then(function (doc) {
            return db.put({
                _id: doc._id,
                _rev: doc._rev,
                title: newContents.title,
                description: newContents.description,
            });
        });

        setData(prevState => {
            let temp = [...prevState];
            temp[arrIndex].title = newContents.title;
            temp[arrIndex].description = newContents.description;
            return temp;
        })
    }

    //Mount
    useEffect(() => {
        db.allDocs({
            include_docs: true,
        }, (err, res) => setData(res.rows.map(each => each.doc)))
    }, [])

    return (
        <div className="flex flex-col h-screen w-screen overflow-x-hidden overflow-y-auto font-main">
            <Overlay overlayVisibility={overlayVisibility} />
            <Header />
            <CardList data={data} deleteNote={deleteNote} modifyNote={modifyNote} setOverlayVisibility={setOverlayVisibility} />
            <CardCreator addNote={addNote} />
            <Footer totalNotes={data.length} />
        </div>
    );
}

export default App;
