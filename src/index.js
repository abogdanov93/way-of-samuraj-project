import React from 'react';
import './index.css';
import state, {addPost, subscribe, updatePostText} from "./state";
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree = (state) => {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App
                    state={state}
                    addPost={addPost}
                    updatePostText={updatePostText}/>
            </BrowserRouter>
        </React.StrictMode>
    );
}

rerenderEntireTree(state);
subscribe(rerenderEntireTree);

reportWebVitals();
