import React, {FC} from "react"
import {Formik} from 'formik'
import {filterType} from "../../../redux/usersReducer"
import {Field} from "formik"

type propsType = {
    onFilterChange: (filter: filterType) => void
}
// type formType = {
//     term: string
//     friend: "true" | "false" | "null"
// }

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
} // почему за пределами компоненты?

const UsersSearchForm: FC<propsType> = ({onFilterChange}) => {
    const submit = (values: any, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
        // const filter: filterType = {
        //     term: values.term,
        //     friend: values.friend === "true" ? true : values.friend === "false" ? false : null
        // }
        onFilterChange(values)
        setSubmitting(false)
    } // почему внутри компоненты?

return <div>
    <Formik
        initialValues={{ term: "", friend: "null"}}
        validate={usersSearchFormValidate}
        onSubmit={submit}
    >
        {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="term"
                    // onChange={handleChange} // нет такого
                    // onBlur={handleBlur} // нет такого
                    // value={values.searchUser} // нет такого
                />
                <Field name="friend" as="select">
                    <option value="null">All users</option>
                    <option value="true">Followed users</option>
                    <option value="false">Unfollowed users</option>
                </Field>
                <button type="submit" disabled={isSubmitting}>Find</button>
            </form>
        )}
    </Formik>
</div>
}

export default UsersSearchForm