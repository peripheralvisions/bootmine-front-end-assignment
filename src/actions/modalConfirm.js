import React from 'react';
import ReactDOM from 'react-dom'

export default function modalConfirm(Component) {
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