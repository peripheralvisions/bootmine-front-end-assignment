import modalConfirm from './modalConfirm'
import ModalDelete from './../components/ModalDelete'

import { Note } from "./../types"

import PouchDB from "pouchdb";

var db = new PouchDB('notes');

function deleteNote(setData: React.Dispatch<React.SetStateAction<Note[] | []>>, id: string, arrIndex: number) {
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

export default deleteNote;