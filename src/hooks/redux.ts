import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import {appDispatchType, stateType} from "../redux/store"


export const useAppDispatch = () => useDispatch<appDispatchType>()
export const useAppSelector: TypedUseSelectorHook<stateType> = useSelector