import React, { useState, useRef, useEffect, useReducer } from "react";
import Columns from "react-columns";
import bootmineLogo from "./svg/Bootmine-logo.svg";

import PouchDB from "pouchdb";
import { func } from "prop-types";

var db = new PouchDB('notes');


function addTodo(noteObject) {

    var todo = {
      _id: new Date().toISOString(),
      title: noteObject.title,
      description: noteObject.description
    };

    db.put(todo, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      }
    });
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

    const onChangeHandler = (evt, updateFunction) => {
        updateFunction(evt.target.value);
    };

    useEffect(() => {
        setTitle(props.title);
        setDescription(props.description);
    }, [props.title, props.description])

    // console.log("props", props);

    return (
        <div
            className={"Card bg-yellow-200 flex flex-col p-4 space-y-3 mr-4 mb-4"}>
            <input
                className="font-semibold bg-transparent outline-none"
                value={title}
                onChange={(evt) => onChangeHandler(evt, setTitle)}
            ></input>
            <hr />
            <textarea
                className="h-24 bg-transparent outline-none"
                name=""
                id=""
                value={description}
                onChange={(evt) => onChangeHandler(evt, setDescription)}
            ></textarea>
            <div className="Card__actions flex flex-row space-x-3 justify-end items-end">
                <div className="Card__actions-delete" onClick={() => props.deleteNote(props._id, props.index)}>DELETE</div>
                <div className="Card__actions-edit" onClick={() => props.modifyNote(props._id, props.index, {title, description})}>EDIT</div>
            </div>
        </div>
    );
};

const CardCreator = ({addNote}) => {

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

const CardList = ({ data, deleteNote, modifyNote }) => {
    return (
        <div className="CardList bg-gray-50 py-8">
            <div className="container mx-auto">
                <Columns>
                    {data.map((each, idx, arr) => {
                        return <Card {...each} key={"Card-" + idx} index={idx} deleteNote={deleteNote} modifyNote={modifyNote} />
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

function App() {
    const [data, setData] = useState([]);

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

        db.get(id).then(function (doc) {
            return db.remove(doc);
        });

        setData(prevState => {
            let temp = [...prevState];
            temp.splice(arrIndex, 1);
            console.log(temp);
            return temp;
        })
    }

    //Modify
    function modifyNote(id, arrIndex, newContents) {
        db.get(id).then(function (doc) {
            console.log(doc);
            console.log(newContents)
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
            console.log(temp);
            return temp;
        })
    }

    useEffect(() => {
        db.allDocs({
            include_docs: true,
        }, (err, res) => setData(res.rows.map(each => each.doc)))
    }, [])

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <CardList data={data} deleteNote={deleteNote} modifyNote={modifyNote}/>
            <CardCreator addNote={addNote} />
            <Footer totalNotes={data.length} />
        </div>
    );
}

export default App;
