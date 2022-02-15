import React from 'react'

const Footer = ({ totalNotes }) => {
    return (
        <div className="h-20 flex shrink-0 items-center text-xl text-gray-400">
            <div className="container mx-auto flex justify-between px-4">
                <span>© Bootmine, 2022</span>
                <span>
                    <strong>{totalNotes} </strong>{totalNotes === 1 ? "note" : "notes"}
                </span>
            </div>
        </div>
    )
}

export default Footer;