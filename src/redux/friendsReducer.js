import React from "react";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";

let initialState = {
    friends: [
        {id: 1, followed: true, name: "marusik_super", avatarSrc: "", location: {country: "Poland", city: "Warsaw"}},
        {id: 2, followed: true, name: "notfat100kg", avatarSrc: "", location: {country: "Russia", city: "Moscow"}}
    ]
}

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                friends: state.friends.map(f => {
                    if (f.id === action.userId) {
                        return {...f, followed: true}
                    }
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                friends: state.friends.map(f => {
                        if (f.id === action.userId) {
                            return {...f, followed: false};
                        }
                    }
                )
            }
        default:
            return state;
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});

export default friendsReducer;