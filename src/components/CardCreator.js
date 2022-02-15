import React, {useRef} from 'react'
import SharedButton from './SharedButton';

const CardCreator = ({ addNote }) => {

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    function clickHandler(evt) {
        addNote({
            title: titleRef.current.value,
            description: descriptionRef.current.value,
        })
        titleRef.current.value = "";
        descriptionRef.current.value = "";
    }

    return (
        <div className="CardCreator bg-zinc-200 py-9 px-4 text-xl">
            <div className="container mx-auto">
                <span className="text-xl font-semibold mb-4 inline-block text-gray-600">New Note</span>
                <div className="CardCreator__card w-full lg:w-1/2 flex flex-col bg-white p-8 rounded-sm">
                    <div className="space-y-4 flex flex-col justify-start">
                        <input ref={titleRef} className="w-full bg-transparent font-semibold outline-none" type="text" placeholder="Your title here" />
                        <hr />
                        <textarea ref={descriptionRef} className="w-full bg-transparent flex-1 text-base resize-none outline-none" placeholder="Type your text here. Feel free to use markdown"></textarea>
                        <SharedButton backgroundColorClass={"bg-washed-green"} textColorClass="text-white" onClick={clickHandler} classNames="self-end">TOEVOEGEN</SharedButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardCreator;