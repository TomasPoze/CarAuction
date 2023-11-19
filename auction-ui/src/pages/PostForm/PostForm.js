import React, { useState } from 'react';
import postsApi from '../../api/postsApi';
import { Formik, Form, Field } from 'formik';
import '../../validation';
import * as Yup from 'yup';
import ErrorMessageTranslated from "../../components/ErrorMessageTranslated/ErrorMessageTranslated";
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import carMake from '../../components/CarList/carMake.json'

import Container from '@material-ui/core/Container';


const initialState = {
    make: '',
    model: '',
    year: '',
    km: '',
    gearbox: '',
    fuel: '',
    city: '',
    price: 0,
    betTime: ''
}

const validationSchema = Yup.object().shape({
    make: Yup.string()
        .label("common:make")
        .required(),
    model: Yup.string()
        .label("common:model")
        .required(),
    year: Yup.number()
        .label("common:year")
        .required(),
    km: Yup.number()
        .label("common:km")
        .required(),
    gearbox: Yup.string()
        .label("common:gearbox")
        .required(),
    fuel: Yup.string()
        .label("common:fuel")
        .required(),
    city: Yup.string()
        .label("common:city")
        .required(),
    price: Yup.number()
        .label("common:price")
        .typeError()

})

const carsMake = carMake;

export default () => {
    const { t } = useTranslation("car")

    const [file, setFile] = useState([{}]);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    const location = useLocation()
    const history = useHistory();
    const { from } = location.state || { from: { pathname: '/auctions' } }


    return (
        <React.Fragment>

            <Container>

                <Formik
                    initialValues={initialState}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        postsApi.createPost(values, file)
                            .then(() => {
                                setTimeout(() => history.replace(from))
                            }, 1000)
                    }}
                >
                    {(props) => (
                        <Form id="carform">
                            <div>
                                <label htmlFor="make">{t("make")}:</label>
                                <Field name="make" as="select" placeholder="Favorite Color">
                                    {carsMake.map((car, index) => (
                                        <option key={index} value={car.name}>{car.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessageTranslated className="error" name="make" />
                            </div>
                            <div>
                                <label htmlFor="model">{t("model")}:</label>
                                <Field name="model" as="select">
                                    {props.values.make ? carsMake.find(carMake => carMake.name === props.values.make).model.map((model, index) => (
                                        <option key={index} value={model}>{model}</option>
                                    )) : ""}
                                </Field>
                                <ErrorMessageTranslated className="error" name="model" />
                            </div>
                            <div>
                                <label htmlFor="year">{t("year")}:</label>
                                <Field name="year" type="text" />
                                <ErrorMessageTranslated className="error" name="year" />
                            </div>
                            <div>
                                <label htmlFor="km">Km:</label>
                                <Field name="km" type="text" />
                                <ErrorMessageTranslated className="error" name="km" />
                            </div>
                            <div>
                                <label htmlFor="gearbox">{t("gearbox")}:</label>
                                <Field name="gearbox" as="select" >
                                    <option></option>
                                    <option value={t("gearbox2")}>{t("gearbox2")}</option>
                                    <option value={t("gearbox1")}>{t("gearbox1")}</option>
                                </Field>
                                <ErrorMessageTranslated className="error" name="gearbox" />
                            </div>
                            <div>
                                <label htmlFor="fuel">{t("fuel")}:</label>
                                <Field name="fuel" as="select">
                                    <option></option>
                                    <option value={t("fuel2")}>{t("fuel2")}</option>
                                    <option value={t("fuel1")}>{t("fuel1")}</option>
                                    <option value={t("fuel3")}>{t("fuel3")}</option>
                                    <option value={t("fuel4")}>{t("fuel4")}</option>
                                    <option value={t("fuel5")}>{t("fuel5")}</option>
                                    <option value={t("fuel6")}>{t("fuel6")}</option>
                                    <option value={t("fuel7")}>{t("fuel7")}</option>
                                    <option value={t("fuel8")}>{t("fuel8")}</option>
                                </Field>
                                <ErrorMessageTranslated className="error" name="fuel" />
                            </div>
                            <div>
                                <label htmlFor="city">{t("city")}:</label>
                                <Field name="city" as="select">
                                    <option></option>
                                    <option value="Vilnius">Vilnius</option>
                                    <option value="Kaunas">Kaunas</option>
                                    <option value="Klaipėda">Klaipėda</option>
                                    <option value="Šiauliai">Šiauliai</option>
                                    <option value="Panavežys">Panavežys</option>
                                </Field>
                                <ErrorMessageTranslated className="error" name="city" />
                            </div>
                            <div>
                                <label htmlFor="file">{t("file")}:</label>
                                <Field name="files" type="file" onChange={handleFileChange} multiple />
                            </div>
                            <div>
                                <label htmlFor="time">{t("setTime")}:</label>
                                <Field name="betTime" as="select">
                                    <option></option>
                                    <option value="86400000">1 d.</option>
                                    <option value="172800000">2 d.</option>
                                    <option value="259200000">3 d.</option>
                                    <option value="345600000">4 d.</option>
                                    <option value="432000000">5 d.</option>
                                </Field>
                                <ErrorMessageTranslated className="error" name="betTime" />
                            </div>
                            <div>
                                <input type="submit" value={t("create")}></input>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Container>
        </React.Fragment>
    )
}