import React from "react";

const ADD_POST = "ADD-POST";
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT";

let initialState = {
    posts: [
        {id: 1, post: "Hi there!", likeCounter: 1},
        {id: 2, post: "Are you going to play fortnite?", likeCounter: 3}
    ],
    newPostText: "",
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
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                post: state.newPostText,
                likeCounter: 0
            }
            state.posts.unshift(newPost);
            state.newPostText = "";
            return state;
        case UPDATE_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const updatePostTextActionCreator = (text) => ({type: UPDATE_POST_TEXT, newText: text})

export default profileReducer;