import React from "react"
import {connect} from "react-redux"
import {filterType, follow, requestUsers, unfollow} from "../../redux/usersReducer"
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {
    getUsers,
    getCurrentPageNumber,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsersFilter
} from "../../redux/usersSelectors"
import {usersType} from "../../types/types"
import {stateType} from "../../redux/reduxStore"

type mapStatePropsType = {
    users: Array<usersType>
    pageSize: number
    totalUsersCount: number
    currentPageNumber: number
    isFetching: boolean
    followingInProgress: Array<number>
    filter: filterType
}
type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers: (currentPageNumber: number, pageSize: number, filter: filterType) => void
}

class UsersContainer extends React.Component <mapStatePropsType & mapDispatchPropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPageNumber, this.props.pageSize, this.props.filter)
    }

    onPageChange = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize, this.props.filter)
    }
    onFilterChange = (filter: filterType) => {
        this.props.requestUsers(1, this.props.pageSize, filter)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPageNumber={this.props.currentPageNumber}
                onPageChange={this.onPageChange}
                onFilterChange={this.onFilterChange}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        </>
    }
}


const mapStateToProps = (state: stateType): mapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPageNumber: getCurrentPageNumber(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}

export default connect<mapStatePropsType, mapDispatchPropsType, {}, stateType>
(mapStateToProps, {follow, unfollow, requestUsers})(UsersContainer)
