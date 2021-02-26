import React, { useEffect, useState } from 'react';
import postsApi from '../../api/postsApi';
import './style.css';
import { useTranslation } from "react-i18next";
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { faCalendarAlt, faTachometerAlt, faGasPump, faCogs, faCity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: 30,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginBottom: 30,
        maxWidth: 1100,
    },
    image: {
        width: 220,
        height: 160,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default () => {
    const { t } = useTranslation(["home", "car", "common"])

    const classes = useStyles();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postsApi.fetchActivePosts()
            .then(response => setPosts(response.data))
    }, [])


    const aucTime = (post) => {
        var countDownDate = new Date(post.betTime + post.postTime).getTime();

        var now = new Date().getTime();
        var distance = countDownDate - now;

        if (distance > 0) {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            return <>
                {t("car:timer")}:
                {" " + days + "d " + hours + "h " + minutes + "m " + seconds + "s"}
            </>
        } else {
            return 0;
        }
    }

    const calculateTimeLeft = (post) => {
        let timeLeft = {};
    
        var countDownDate = new Date(post.betTime + post.postTime).getTime();

        var now = new Date().getTime();

        var distance = countDownDate - now

        if (distance > 0) {
            timeLeft = {
                d: Math.floor(distance / (1000 * 60 * 60 * 24)),
                h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                s: Math.floor((distance % (1000 * 60)) / 1000),
            };
        }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState();

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft(0));
        }, 1000);
    });

    const showTimer = (post) => aucTime(post) !== 0 ? aucTime(post) : <span className="">{t("car:auc")}</span>


    return (
        <div>
            <Container maxWidth="lg">
                <main>
                    <section className="hero-banner">
                        <div className="main ">
                            <div className="intro-text text-center">
                                <h1>Car-Auction, {t("main-title")}</h1>
                                <LinkContainer to="/auctions">
                                    <a href="/#" className="button button-prim">{t("auctions")}</a>
                                </LinkContainer>
                                <LinkContainer to="/posts/post">
                                    <a href="/#" className="button button-sec">{t("create")}</a>
                                </LinkContainer>
                            </div>
                        </div>
                    </section>
                    <hr />
                    <h5 className="mb-3">{t("ongoing-auc")}:</h5>
                    <div>
                        {posts.slice(-4).map(post => (
                            <Paper className={`${classes.paper} "padt" `} elevation={5} key={post.id}>
                                <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <ButtonBase className={classes.image}>
                                                {
                                                    post.fileName &&
                                                    <img className={classes.img} src={`http://localhost:8080/files/${post.fileName}`} alt="Car"></img>
                                                }
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="h5">
                                                        {`${post.make} ${post.model}`}

                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        <FontAwesomeIcon icon={faCalendarAlt} size="lg" className="mr-1" />
                                                        {` ${post.year}`}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        <FontAwesomeIcon icon={faTachometerAlt} size="lg" className="mr-1" />
                                                        {post.km + " km"}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        <FontAwesomeIcon icon={faCogs} size="lg" className="mr-1" />
                                                        {post.gearbox}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        <FontAwesomeIcon icon={faGasPump} size="lg" className="mr-1" />
                                                        {post.fuel}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        <FontAwesomeIcon icon={faCity} size="lg" className="mr-1" />
                                                        {post.city}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item className="flex-car-timer">
                                                <div>
                                                    <Typography variant="subtitle1" color="textSecondary" align="center" className="posfix">{t("car:bet")}</Typography>
                                                    <Typography variant="h4" align="center" gutterBottom className="posfix pb-3">
                                                        {`${post.price}€`}
                                                    </Typography>
                                                </div>
                                                <Typography variant="inherit" align="center" className="border">{showTimer(post)}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </NavLink>
                            </Paper>
                        ))}
                    </div>
                    <div className="flex-center">
                        <LinkContainer to="/auctions">
                            <a href="/#" className="button button-grey">{t("all-auc")}</a>
                        </LinkContainer>
                    </div>
                    <hr />
                    <div className="text-center">
                        <h1>
                            {t("common:about")}
                        </h1>
                        <p>
                            {t("about-text")}
                        </p>
                        <div >
                            <LinkContainer to="/about">
                                <a href="/#" className="button button-grey">{t("info")}</a>
                            </LinkContainer>
                        </div>
                    </div>
                </main>
            </Container>
            <footer>
                <Container maxWidth="lg">

                    <div className="flex-space-around">
                        <div>
                            <h4 className="mt-3">{t("contact")}</h4>
                            <div className="flex-sitemap footer-text">
                                <a href="https://www.linkedin.com/in/tomaspoze">- Linkedin</a>
                                <a href="https://github.com/TomasPoze">- Github</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="mt-3">Car-Auction</h4>
                            <div className="flex-sitemap footer-text">
                                <LinkContainer to="/home">
                                    <a href="/#">- {t("common:home")}</a>
                                </LinkContainer>
                                <LinkContainer to="/auctions">
                                    <a href="/#">- {t("common:auctions")}</a>
                                </LinkContainer>
                                <LinkContainer to="/about">
                                    <a href="/#">- {t("common:about")}</a>
                                </LinkContainer>
                            </div>
                        </div>
                    </div>
                </Container>
            </footer>
        </div>
    )
}