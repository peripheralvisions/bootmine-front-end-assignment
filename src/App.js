import React, { useState, useRef, useEffect } from "react";
import Columns from "react-columns";

const demoData = [
    {
        title: "Hello World",
        description: "This is a placeholder",
    },

    {
        title: "Hello World",
        description: "This is a placeholder",
    },

    {
        title: "Hello World",
        description: "This is a placeholder",
    },

    {
        title: "Hello World",
        description: "This is a placeholder",
    },

    {
        title: "Hello World",
        description: "This is a placeholder",
    },

    {
        title: "Hello World",
        description: "This is a placeholder",
    },

    {
        title: "Hello World",
        description: "This is a placeholder",
    },

    {
        title: "Hello World",
        description: "This is a placeholder",
    },
];

const Header = () => {
    return (
        <div className="flex justify-center items-center text-lg h-24 bg-black text-white">
            Bootmine
        </div>
    );
};

const Card = (props) => {
    
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const onChangeHandler = (evt, updateFunction) => {
        updateFunction(evt.target.value);
    };

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
                <div className="Card__actions-delete">DELETE</div>
                <div className="Card__actions-edit">EDIT</div>
            </div>
        </div>
    );
};

const CardCreator = () => {
    return (
        <div className="CardCreator bg-gray-100 flex-1 p-8 text-xl">
            <div className="container mx-auto">
                <span className="text-lg font-semibold mb-4 inline-block text-gray-600">New Note</span>
                <div className="CardCreator__card w-1/2 flex flex-col bg-white p-8">
                    <div className="space-y-4 flex flex-col">
                        <input className="w-full bg-transparent font-semibold outline-none" type="text" placeholder="Your title here" />
                        <hr />
                        <textarea className="w-full bg-transparent flex-1 text-base resize-none outline-none" placeholder="Type your text here. Feel free to use markdown"></textarea>
                        <button className="bg-green-400 text-base text-white p-3 py-2 self-end">TOEVOEGEN</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CardList = ({ data }) => {
    return (
        <div className="CardList bg-gray-50 py-8">
            <div className="container mx-auto">
                <Columns>
                    {data.map((each, idx, arr) => (
                        <Card {...each} key={"Card-" + idx} />
                    ))}
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
    const [data, setData] = useState(demoData);

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <CardList data={data} />
            <CardCreator />
            <Footer totalNotes={data.length} />
        </div>
    );
}

export default App;
