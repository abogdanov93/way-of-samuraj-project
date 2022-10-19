import profileReducer, {actions} from "../profileReducer"

// 1. готовим исходные данные - state and action
let state = {
    posts: [
        {id: 1, post: "Hi there!", likeCounter: 1},
        {id: 2, post: "Are you going to play fortnite?", likeCounter: 3}
    ],
    profile: null,
    isEditMode: false,
    status: ""
}

test("length of posts should be 3", () => {
    let action = actions.addPost("Test")

    // 2. вызываем reducer
    let newState = profileReducer(state, action)

    // 3. expectation // новый стейт дб такой же, как мы ожидаем получить
    expect(newState.posts.length).toBe(3)

})

test("new message text should be correct", () => {
    let action = actions.addPost("Test")

    let newState = profileReducer(state, action)

    expect(newState.posts[0].post).toBe("Test")

})

test("length of posts should be 1", () => {
    let action = actions.deletePost(1)

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(1)

})


test("length of posts shouldn't be changed if id isn't correct", () => {
    let action = actions.deletePost(1000)

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)

})