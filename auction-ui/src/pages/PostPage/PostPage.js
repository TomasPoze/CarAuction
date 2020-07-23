import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import postsApi from '../../api/postsApi';
import { UserContext } from '../../App'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Secured from '../../components/Secured/Secured';

import Container from '@material-ui/core/Container';

import Carousel from 'react-bootstrap/Carousel'
import './styles.css'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const validationSchema = Yup.object().shape({
    sum: Yup.number()
        .label("common:sum")
        .min(200)
        .required()
})



export default () => {

    const { i18n } = useTranslation()
    const { t } = useTranslation("car")

    var countDownDate = new Date("2020 07 25").getTime();

    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var second = Math.floor((distance % (1000 * 60)) / 1000);

    const [seconds, setSeconds] = useState(distance);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
            if (distance < 0) {
                clearInterval(interval);
                return "EXPIRED"
            }
        }, 1000);

    }, []);

    const showTimer = distance < 0 ? (
        <>
            <h4 className="over">Aukcionas pasibage</h4>
        </>
    ) : <>
            {days + "d " + hours + "h " + minutes + "m " + second + "s"}
        </>


    const classes = useStyles();

    const { user, logout, loggedIn } = useContext(UserContext)

    const { id } = useParams({});
    const [post, setPost] = useState({});
    const [posts, setPosts] = useState({});

    const [bet, setBet] = useState({ content: [], });


    const state = {
        data: new Date()
    }

    const initialState = {
        city: '',
        date: '',
        sum: '',
        username: '',
        postId: ''
    }

    const onSubmit = values => {
        values.city = user.city;
        values.date = state.data.toLocaleDateString() + " " + state.data.toLocaleTimeString();
        values.username = user.username;
        values.postId = post.id;
        postsApi.createBet(values);
    }

    const sumInput = bet.content.length !== 0 ? (bet.content[bet.content.length - 1].sum) : 0


    const loggedInBlock = loggedIn() ? (
        <>
            <Formik
                initialValues={initialState}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form id="bet-sum">
                    <Field className="price-input" name="sum" type="number" min={sumInput + 25} placeholder={sumInput + 25}></Field>
                    <Button className="green-border" type="submit">{t("makeBet")}</Button>
                </Form>
            </Formik>
        </>
    ) : <Button color="" href="/login" className="green-border border">{t("toBet")}</Button>

    const deletePost = e => {
        postsApi.deletePostById(id)
            .then(resp => setPosts(resp.data));

    }

    const deleteButton = loggedIn() ? (
        <>
            <Secured role="ADMIN">
                <Button onClick={deletePost} color="primary">Istrinti posta</Button>
            </Secured>
        </>
    ) : <span></span>


    // useEffect(() => {
    //     postsApi.fetchBetById(id)
    //         .then(resp => setBet(resp.data))
    // }, [id])

    useEffect(() => {
        postsApi.fetchPostById(id)
            .then(resp => setPost(resp.data));
    }, [id])

    useEffect(() => {
        postsApi.fetchBets(id)
            .then(resp => setBet(resp.data))
    }, [id])



    return (
        <React.Fragment>
            <Container maxWidth="lg">
                {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
                <div className="grid-container pt-5">
                    <div>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={`http://localhost:8080/files/${post.fileName}`}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={`http://localhost:8080/files/${post.fileName}`}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="fr p-2">
                        <h2>{post.make} {post.model}</h2>
                        <p>{t("carLoc")}:<span className="fr"><b>{post.city}</b></span></p>
                        <p>{t("year")}:<span className="fr">{post.year}</span></p>
                        <p>{t("odometer")}:<span className="fr">{post.km} km</span></p>
                        <p>{t("fuelType")}:<span className="fr">{post.fuel}</span></p>
                        <p>{t("gearbox")}:<span className="fr">{post.gearbox}</span></p>
                        {deleteButton}
                    </div>
                    <div className="mt-4 grey-border fixb">
                        <h5>Aukciono statistika</h5>
                        <TableContainer component={Paper} className="scroll">
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">{t("city")}</TableCell>
                                        <TableCell align="center">{t("betDate")}</TableCell>
                                        <TableCell align="right">{t("curBet")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bet.content.map(bets => (
                                        <TableRow key={bets.id} >
                                            <TableCell align="left" component="th" scope="row">
                                                {bets.city}
                                            </TableCell>
                                            <TableCell align="center">{bets.date}</TableCell>
                                            <TableCell align="right"><b>{bets.sum}€</b></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="tc grey-border">
                        <h3>{t("aucEnd")}</h3>
                        <h4>{showTimer}</h4>
                        <hr />
                        <p>{t("lastBet")}: <span className="price">
                            {sumInput}
                        €</span></p>
                        {loggedInBlock}
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
};