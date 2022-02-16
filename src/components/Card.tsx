import React, {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown'
import TextareaAutosize from 'react-textarea-autosize';

import SharedButton from './SharedButton';

import pencilSVG from "./../svg/basic_pencil_ruler_pen.svg"
import trashcanSVG from "./../svg/basic_trashcan.svg"

interface Props {
    _id: string,
    description: string,
    index: number,
    title: string,
    setOverlayVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    modifyNote: (_id: string, index: number, newContents: {title: string, description: string}) => void,
    deleteNote: (_id: string, index: number) => void,
}

const Card: React.FunctionComponent<Props> = (props: Props) => {

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const [isEdited, setIsEdited] = useState(false)

    const onChangeHandler = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, updateFunction: React.Dispatch<React.SetStateAction<string>>) => {
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
            className={"Card group rounded-sm bg-pale-yellow flex flex-col shadow-sm text-gold-fusion p-4 space-y-3 lg:mr-4 mb-4" + " " + (isEdited ? "z-50 relative text-jacko-bean" : "")}>
            <input
                disabled={isEdited ? false : true}
                className={`font-semibold bg-transparent outline-none text-lg`}
                value={title}
                onChange={(evt) => onChangeHandler(evt, setTitle)}
            ></input>
            <hr />
            {
                isEdited ? (
                    <TextareaAutosize
                        className="bg-transparent outline-none inline-block h-auto resize-none overflow-hidden leading-6"
                        onChange={(evt) => onChangeHandler(evt, setDescription)}>
                        {description}
                    </TextareaAutosize>
                ) : (
                    <ReactMarkdown className="break-words prose leading-6 text-inherit" children={description} />
                )
            }
            <div className="Card__actions flex flex-row justify-end items-end">
                {isEdited ?
                    (<SharedButton backgroundColorClass="bg-black" onClick={() => {
                        props.modifyNote(props._id, props.index, { title, description })
                        setIsEdited(false);
                    }}>SAVE</SharedButton>)
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

export default Card;