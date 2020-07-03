import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import FormikState from "../../components/FormikState/FormikState";
import { useHistory } from 'react-router-dom';
import userApi from '../../api/userApi';
import { setCredentials } from '../../api';
import { UserContext } from '../../App';


const initialValues = {
    username: '',
    password: ''
}

export default () => {
    const { login } = useContext(UserContext)
    const history = useHistory();

    const onSubmit = values => {
        setCredentials(values)

        userApi.getUser()
            .then(({ data }) => {
                login(data)
                history.push("/")
            })
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {(props) => (
                <Form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <Field name="username" type="text" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <Field name="password" type="password"/>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                    <FormikState {...props}/>
                </Form>
            )}
        </Formik>
    )
}