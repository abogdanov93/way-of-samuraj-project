import React from "react";

const ADD_POST = "ADD-POST";
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT";
const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

let store = {

    _state: {
        profile: {
            posts: [
                {id: 1, post: "Hi there!", likeCounter: 1},
                {id: 2, post: "Are you going to play fortnite?", likeCounter: 3}
            ],
            newPostText: "text me"
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
            newMessageText: "text me"
        },
        friends: [
            {
                id: 1,
                name: "marusik_super",
                avatar: "https://i.pinimg.com/474x/83/73/c9/8373c9bbddf97a72c445eab91f3d6fbc.jpg"
            },
            {
                id: 2,
                name: "notfat100kg",
                avatar: "https://media.fortniteapi.io/images/cosmetics/e9d61c4a4aae593fbac8d72182da83f2/v2/background.png"
            }
        ]
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
        if (action.type === ADD_POST) {
            let newPost = {
                id: 4,
                post: this._state.profile.newPostText,
                likeCounter: 0
            }
            this._state.profile.posts.unshift(newPost);
            this._state.profile.newPostText = "";
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_POST_TEXT) {
            this._state.profile.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === ADD_MESSAGE) {
            let newMessage = {
                id: 5,
                message: this._state.dialogs.newMessageText
            }
            this._state.dialogs.messages.push(newMessage);
            this._state.dialogs.newMessageText = "";
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_MESSAGE_TEXT) {
            this._state.dialogs.newMessageText = action.newMessage;
            this._callSubscriber(this._state);
        }

    }
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const updatePostTextActionCreator = (text) => ({type: UPDATE_POST_TEXT, newText: text});
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageTextActionCreator = (message) => ({type: UPDATE_MESSAGE_TEXT, newMessage: message});


window.store = store;

export default store;