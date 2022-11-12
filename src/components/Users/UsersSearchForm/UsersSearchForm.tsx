import React, {FC} from "react"
import {Formik} from 'formik'
import {filterType} from "../../../redux/reducers/usersReducer"
import {Field} from "formik"
import {useSelector} from "react-redux"
import {getUsersFilter} from "../../../redux/selectors/usersSelectors"
import style from "./UserSearchForm.module.css"
import {PrimaryButton} from "../../Utils/PrimaryButton/PrimaryButton"

// with Formik

type propsType = {
    onFilterChange: (filter: filterType) => void
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
                    <option value="null">All users</option>
                    <option value="true">Followed</option>
                    <option value="false">Unfollowed</option>
                </Field>

                <PrimaryButton type="submit" disabled={isSubmitting}>Find</PrimaryButton>
            </form>
        )}
    </Formik>
</div>
}

export default UsersSearchForm