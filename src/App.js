import React, { useState, useRef, useEffect, useReducer } from "react";
import ReactDOM from 'react-dom'
import Columns from "react-columns";

import ReactMarkdown from 'react-markdown'
import TextareaAutosize from 'react-textarea-autosize';

import bootmineLogo from "./svg/Bootmine-logo.svg";

import pencilSVG from "./svg/basic_pencil_ruler_pen.svg"
import trashcanSVG from "./svg/basic_trashcan.svg"

import PouchDB from "pouchdb";

var db = new PouchDB('notes');

function modalConfirm(Component) {
    return function () {
        const targetNode = document.body.appendChild(document.createElement('div'));

        const promise = new Promise((resolve, reject) => {
            ReactDOM.render(<Component reject={reject} resolve={resolve} dispose={dispose} />, targetNode);
        })

        function dispose() {
            ReactDOM.unmountComponentAtNode(targetNode);
            setTimeout(() => {
                if (document.body.contains(targetNode)) {
                    document.body.removeChild(targetNode)
                }
            });
        }

        return promise.then((result) => {
            dispose();
            return result;
        }, (result) => {
            dispose();
            return Promise.reject(result);
        })
    }
}

const Header = () => {
    return (
        <div className="flex justify-center items-center text-lg h-24 bg-black text-white">
            <img src={bootmineLogo} alt="" srcset="" />
        </div>
    );
};

const Card = (props) => {

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const [isEdited, setIsEdited] = useState(false)

    const onChangeHandler = (evt, updateFunction) => {
        updateFunction(evt.target.value);
    };

    useEffect(() => {
        setTitle(props.title);
        setDescription(props.description);
    }, [props.title, props.description])

    useEffect(() => {
        props.setOverlayVisibility(isEdited)
    }, [isEdited]);

    return (
        <div
            className={"Card group bg-yellow-100 flex flex-col p-4 space-y-3 mr-4 mb-4" + " " + (isEdited ? "z-50 relative" : "")}>
            <input
                disabled={isEdited ? false : true}
                className="font-semibold bg-transparent outline-none"
                value={title}
                onChange={(evt) => onChangeHandler(evt, setTitle)}
            ></input>
            <hr />
            {
                isEdited ? (
                    <TextareaAutosize
                        className="bg-transparent outline-none inline-block h-auto resize-none overflow-hidden"
                        name=""
                        id=""
                        onChange={(evt) => onChangeHandler(evt, setDescription)}>
                        {description}
                    </TextareaAutosize>
                ) : (
                    <ReactMarkdown className="break-words prose" children={description} />
                )
            }
            <div className="Card__actions flex flex-row justify-end items-end">
                {isEdited ?
                    (<div className="Card__actions-save" onClick={() => {
                        props.modifyNote(props._id, props.index, { title, description })
                        setIsEdited(false);
                    }}>SAVE</div>)
                    :
                    (<div className="flex flex-row space-x-2 invisible group-hover:visible">
                        <div className="Card__actions-delete" onClick={() => props.deleteNote(props._id, props.index)}>
                            <img className="h-5 cursor-pointer" src={trashcanSVG} />
                        </div>
                        <div className="Card__actions-edit" onClick={() => setIsEdited(true)}>
                            <img className="h-5 cursor-pointer" src={pencilSVG} />
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

const CardCreator = ({ addNote }) => {

    const titleRef = useRef("");
    const descriptionRef = useRef("");

    function clickHandler(evt) {
        addNote({
            title: titleRef.current.value,
            description: descriptionRef.current.value,
        })
        titleRef.current.value = "";
        descriptionRef.current.value = "";
    }

    return (
        <div className="CardCreator bg-gray-100 flex-1 p-8 text-xl">
            <div className="container mx-auto">
                <span className="text-lg font-semibold mb-4 inline-block text-gray-600">New Note</span>
                <div className="CardCreator__card w-1/2 flex flex-col bg-white p-8">
                    <div className="space-y-4 flex flex-col">
                        <input ref={titleRef} className="w-full bg-transparent font-semibold outline-none" type="text" placeholder="Your title here" />
                        <hr />
                        <textarea ref={descriptionRef} className="w-full bg-transparent flex-1 text-base resize-none outline-none" placeholder="Type your text here. Feel free to use markdown"></textarea>
                        <button className="bg-green-400 text-base text-white p-3 py-2 self-end" onClick={clickHandler}>TOEVOEGEN</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CardList = ({ data, deleteNote, modifyNote, setOverlayVisibility }) => {
    return (
        <div className="CardList bg-gray-50 py-8">
            <div className="container mx-auto">
                <Columns>
                    {data.map((each, idx, arr) => {
                        return <Card {...each} key={"Card-" + idx} index={idx} deleteNote={deleteNote} modifyNote={modifyNote} setOverlayVisibility={setOverlayVisibility} />
                    })}
                </Columns>
            </div>
        </div>
    );
};

const Footer = ({ totalNotes }) => {
    return (
        <div className="h-24 flex items-center text-xl">
            <div className="container mx-auto flex justify-between">
                <span>© Bootmine, 2022</span>
                <span>
                    <strong>{totalNotes} </strong>{totalNotes === 1 ? "note" : "notes"}
                </span>
            </div>
        </div>
    )
}

const Overlay = (props) => {
    return (
        <div className={`Overlay fixed z-40 bg-black/[.7]  w-screen h-screen top-0 left-0 ${props.overlayVisibility ? "" : "hidden"}`}>
            {props.children}
        </div>
    )
}

const Modal = ({ resolve, reject }) => {
    return (
        <div>
            <Overlay overlayVisibility={true} />
            <div className="Modal w-screen h-screen fixed top-0 left-0 z-50">
                <div className="w-full h-full flex justify-center items-center text-white space-x-4">
                    <button onClick={() => reject()}>NO</button>
                    <button onClick={() => resolve(true)}>YES</button>
                </div>
            </div>
        </div>
    )
}

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

        modalConfirm(Modal)()
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
        <div className="flex flex-col h-screen">
            <Overlay overlayVisibility={overlayVisibility} />
            <Header />
            <CardList data={data} deleteNote={deleteNote} modifyNote={modifyNote} setOverlayVisibility={setOverlayVisibility} />
            <CardCreator addNote={addNote} />
            <Footer totalNotes={data.length} />
        </div>
    );
}

export default App;
