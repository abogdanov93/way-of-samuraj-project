import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import {AppDispatchType, StateType} from "../redux/store"


export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector