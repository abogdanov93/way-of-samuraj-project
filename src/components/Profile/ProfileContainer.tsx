import React from "react"
import {connect} from "react-redux"
import Profile from "./Profile"
import {useLocation, useNavigate, useParams} from "react-router-dom"
import {getStatus, getUserProfile} from "../../redux/profileReducer"
import {compose} from "redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {stateType} from "../../redux/reduxStore"
//
// type mapStatePropsType = {
//     userId: number
//     router: any
// }
// type mapDispatchPropsType = {
//     getUserProfile: (userId: number) => void
//     getStatus: (userId: number) => void
// }
// type propsType = mapStatePropsType & mapDispatchPropsType
//
// class ProfileContainer extends React.Component<propsType> {
//
//     refreshProfile() {
//         let userId: number | null = this.props.router.params.userId
//         if (!userId) {
//             userId = this.props.userId
//         }
//         this.props.getUserProfile(userId)
//         this.props.getStatus(userId)
//     }
//
//     componentDidMount() {
//         this.refreshProfile()
//     }
//
//     componentDidUpdate(prevProps: propsType, prevState: propsType) {
//         if (this.props.router.params.userId !== prevProps.router.params.userId) {
//             this.refreshProfile()
//         }
//     }
//
//     render() {
//         return <Profile isOwner={!this.props.router.params.userId}/>
//     }
// }
//
//
// const mapStateToProps = (state: stateType) => {
//     return {
//         userId: state.auth.userId
//     } as mapStatePropsType
// }
//
// // const GetCurrentUserId = () => {
// //     const params = useParams()
// //     const userId = params.userId
// //     return userId
// // }
//
//
// export default compose<React.ComponentType>(
//     connect<mapStatePropsType, mapDispatchPropsType, {}, stateType>
//     (mapStateToProps, {
//         getUserProfile,
//         getStatus
//     }), withAuthRedirect)(ProfileContainer)