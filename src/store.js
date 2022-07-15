import React from "react";

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
            dialogs: [
                {id: 1, name: "marusik_super"},
                {id: 2, name: "notfat100kg"}
            ],
            messages: [
                {id: 1, message: "Привет, мы с Натуликом в лобби."},
                {id: 2, message: "Почему все так лагает?!"},
                {id: 3, message: "Марусик, поправь наушники!"}
            ]
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

    addPost() {
        let newPost = {
            id: 4,
            post: this._state.profile.newPostText,
            likeCounter: 0
        }

        this._state.profile.posts.unshift(newPost);
        this._state.profile.newPostText = "";
        this._callSubscriber(this._state);
    },

    updatePostText(newText) {
        this._state.profile.newPostText = newText;
        this._callSubscriber(this._state);
    },

    _callSubscriber() {
        console.log("state has been changed");
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    getState() {
        return this._state;
    }
}

window.store = store;

export default store;