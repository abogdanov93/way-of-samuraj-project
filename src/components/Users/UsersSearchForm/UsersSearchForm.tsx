import React, {FC} from "react"
import {Formik} from 'formik'
import {Field} from "formik"
import {useSelector} from "react-redux"
import {getUsersFilter} from "../../../redux/selectors/usersSelectors"
import style from "./UserSearchForm.module.css"
import {MyPrimaryButton} from "../../Utils/MyPrimaryButton/MyPrimaryButton"
import {FilterType} from "../../../redux/reducers/usersSlice"

/* IMPLEMENTED WITH FORMIK */

type propsType = {
    onFilterChange: (filter: FilterType) => void
}

const UsersSearchForm: FC<propsType> = ({onFilterChange}) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: any, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
        onFilterChange(values)
        setSubmitting(false)
    }

return <div>
    <Formik
        initialValues={{ term: filter.term, friend: filter.friend}}
        enableReinitialize={true}
        onSubmit={submit}
    >
        {({handleSubmit, isSubmitting}) => (
            <form className={style.form} onSubmit={handleSubmit}>

                <Field className={style.search}
                       placeholder="Who are you looking for?"
                       type="text"
                       name="term"
                />

                <Field className={style.select}
                       name="friend"
                       as="select">
                    <option value={undefined}>All users</option>
                    <option value="true">Followed</option>
                    <option value="false">Unfollowed</option>
                </Field>

                <MyPrimaryButton type="submit" disabled={isSubmitting}>Find</MyPrimaryButton>
            </form>
        )}
    </Formik>
</div>
}

export default UsersSearchForm