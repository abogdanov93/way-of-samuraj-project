import React from "react";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {

    _state: {
        profile: {
            posts: [
                {id: 1, post: "Hi there!", likeCounter: 1},
                {id: 2, post: "Are you going to play fortnite?", likeCounter: 3}
            ],
            newPostText: ""
        },
        dialogs: {
            dialog: [
                {id: 1, name: "marusik_super"},
                {id: 2, name: "notfat100kg"}
            ],
            messages: [
                {id: 1, message: "Привет, мы с Натуликом в лобби."},
                {id: 2, message: "Почему все так лагает?!"},
                {id: 3, message: "Марусик, поправь наушники!"}
            ],
            newMessageText: ""
        }
    },

    _callSubscriber() {
        console.log("state has been changed");
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    getState() {
        return this._state;
    },

    dispatch(action) {
        this._state.profile = profileReducer(this._state.profile, action);
        this._state.dialogs = dialogsReducer(this._state.dialogs, action);

        this._callSubscriber(this._state);
    }

}

window.store = store;

export default store;