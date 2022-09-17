import usersReducer, {actions, initialStateType} from "./usersReducer"

let testState: initialStateType // инициализировать не сразу, потому что тест может поменять стейт
beforeEach(() => { // инициализация перед каждым тестом
    testState = {
        users: [
            {id: 0, name: "M", status: "0", photos: {small: null, large: null}, followed: false},
            {id: 1, name: "A", status: "1", photos: {small: null, large: null}, followed: false},
            {id: 2, name: "C", status: "2", photos: {small: null, large: null}, followed: true},
            {id: 3, name: "T", status: "3", photos: {small: null, large: null}, followed: true},
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPageNumber: 1,
        isFetching: true,
        followingInProgress: [],
        filter: {term: "", friend: null}
    }
})

test("followUser success", () => {

    const newState = usersReducer(testState, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
    expect(newState.users[2].followed).toBeTruthy()

})

test("unfollowUser success", () => {

    const newState = usersReducer(testState, actions.unfollowSuccess(2))

    expect(newState.users[1].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()

})
