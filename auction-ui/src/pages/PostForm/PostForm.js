import React, { useState } from 'react';
import postsApi from '../../api/postsApi';
import { Formik, Form, Field } from 'formik';
import '../../validation';
import * as Yup from 'yup';
import ErrorMessageTranslated from "../../components/ErrorMessageTranslated/ErrorMessageTranslated";
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import carMake from '../../components/CarList/carMake.json'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _ from 'lodash';
import FormikState from '../../components/FormikState/FormikState';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const initialState = {
    make: '',
    model: '',
    year: '',
    km: '',
    gearbox: '',
    fuel: '',
    city: '',
    price: '',
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
    const { i18n } = useTranslation()
    const { t } = useTranslation("car")

    const [file, setFile] = useState({});
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    const location = useLocation()
    const history = useHistory();
    const { from } = location.state || { from: { pathname: '/auctions' } }


    // material-ui selectas
    const classes = useStyles();
    const [carId, setCarId] = React.useState('');


    const handleChange = (event) => {
        setCarId(event.target.value);
        // console.log(JSON.stringify(cars[0].name))
        console.log()
    };

    return (
        <React.Fragment>

            <Container>

                <Formik
                    initialValues={initialState}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        postsApi.createPost(values, file);
                        history.replace(from)
                    }}
                >
                    {(props) => (
                        <Form id="carform">
                            {/* <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="make" id="demo-simple-select-label">Markė</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={carId}
                        onChange={handleChange}
                        >
                        {carsMake.map(car => (
                            <MenuItem name="make" required value={car.name}>{x} </MenuItem>
                            ))}
                            </Select>
                        </FormControl> */}
                            <div>
                                <label htmlFor="make">{t("make")}:</label>
                                <Field name="make" as="select" placeholder="Favorite Color">
                                    {carsMake.map(car => (
                                        <option value={car.name}>{car.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessageTranslated className="error" name="make" />

                            </div>

                            <div>
                                <label htmlFor="model">{t("model")}:</label>
                                <Field name="model" as="select">
                                    {props.values.make ? carsMake.find(carMake => carMake.name === props.values.make).model.map(model => (
                                        <option value={model}>{model}</option>
                                    )) : ""}
                                </Field>
                                <ErrorMessageTranslated className="error" name="model" />
                            </div>


                            {/* <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Modelis</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={carId}
                        onChange={handleChange}
                        >
                        <MenuItem value={1}>A4</MenuItem>
                        <MenuItem value={2}>320</MenuItem>
                        <MenuItem value={3}>330</MenuItem>
                        </Select>
                    </FormControl> */}

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
                                <label htmlFor="price">{t("price")}:</label>
                                <Field name="price"></Field>
                                <ErrorMessageTranslated className="error" name="price" />
                            </div>
                            <div>
                                <label htmlFor="file">{t("file")}:</label>
                                <Field name="files" type="file" onChange={handleFileChange} />
                            </div>
                            <div>
                                <label htmlFor="time">{t("setTime")}:</label>
                                <Field name="betTime" as="select">
                                    <option></option>
                                    <option value="1">1 d.</option>
                                    <option value="2">2 d.</option>
                                    <option value="3">3 d.</option>
                                    <option value="4">4 d.</option>
                                    <option value="5">5 d.</option>
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