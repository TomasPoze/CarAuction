import React, { useState } from 'react';
import postsApi from '../../api/postsApi';
import { Formik, Form, Field } from 'formik';
import '../../validation';
import * as Yup from 'yup';
import ErrorMessageTranslated from "../../components/ErrorMessageTranslated/ErrorMessageTranslated";

const initialState = {
    title: '',
    price: ''
}

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .label("common:title")
        .required(),
    price: Yup.number()
        .label("common:price")
        .typeError()
        .min(1)
        .required()
})

export default () => {
    const [file, setFile] = useState({});
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={values => {
                postsApi.createPost(values,file);
            }}
        >
            {(props) => (
                <Form>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <Field name="title" type="text" />
                        <ErrorMessageTranslated className="error" name="title" />
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <Field name="price" type="text" />
                        <ErrorMessageTranslated className="error" name="price" />
                    </div>
                    <div>
                        <label htmlFor="file">File:</label>
                        <Field name="files" type="file" onChange={handleFileChange} />
                    </div>
                    <div>
                        <input type="submit" value="Create"></input>
                    </div>
                </Form>
            )}
        </Formik>
    )
}