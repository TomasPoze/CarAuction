import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import postsApi from '../../api/postsApi';
import { UserContext } from '../../App'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import CssBaseline from '@material-ui/core/CssBaseline';
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
    const classes = useStyles();

    const { user, logout, loggedIn } = useContext(UserContext)

    const { id } = useParams({});
    const [post, setPost] = useState({});

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
                    <Field className="price-input" name="sum" type="number" min={sumInput+25} placeholder={sumInput+25}></Field>
                    <Button className="green-border" type="submit">Daryti statyma</Button>
                </Form>
            </Formik>
        </>
    ) : <Button color="" href="/login" className="green-border border">Noredami statyti - prisijunkite</Button>

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
            <CssBaseline />
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
                        <p>Auto buvimo miestas:<span className="fr"><b>{post.city}</b></span></p>
                        <p>Metai:<span className="fr">{post.year}</span></p>
                        <p>Rida:<span className="fr">{post.km} km</span></p>
                        <p>Kuro tipas:<span className="fr">{post.fuel}</span></p>
                        <p>Pavaru deze:<span className="fr">{post.gearbox}</span></p>
                    </div>
                    <div className="mt-4 grey-border fixb">
                        <h5>Aukciono statistika</h5>
                        <TableContainer component={Paper} className="scroll">
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Miestas</TableCell>
                                        <TableCell align="center">Statymo data</TableCell>
                                        <TableCell align="right">Statymas</TableCell>
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
                        <h3>Iki aukciono pabaigos</h3>
                        <p>14val 28min 13s</p>
                        <hr />
                        <p>Paskutinis statymas: <span className="price">
                            {sumInput}
                        €</span></p>
                        {loggedInBlock}
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
};