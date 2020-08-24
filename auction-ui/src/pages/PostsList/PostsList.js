import React, { useEffect, useState } from 'react';
import postsApi from '../../api/postsApi';
import { useTranslation } from "react-i18next";
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { faCalendarAlt, faTachometerAlt, faGasPump, faCogs, faCity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.css';


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

export default function ComplexGrid() {
    const { t } = useTranslation("car")

    const classes = useStyles();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postsApi.fetchPosts()
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
                {t("timer")}:
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
        let isMounted = true;
        setTimeout(() => {
            if (isMounted) {
                setTimeLeft(calculateTimeLeft(0));
            }
        }, 1000);
        return () => {isMounted = false};
    });

const showTimer = (post) => aucTime(post) !== 0 ? aucTime(post)  : <span className="">{t("auc")}</span>

    return (
        <div className={classes.root}>
            {posts.map(post => (
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
                                            {post.make}
                                        &nbsp;
                                        {post.model}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
                                        &nbsp;
                                        {" " + post.year}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <FontAwesomeIcon icon={faTachometerAlt} size="lg" />
                                        &nbsp;
                                        {post.km + " km"}

                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <FontAwesomeIcon icon={faCogs} size="lg" />
                                        &nbsp;
                                        {post.gearbox}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <FontAwesomeIcon icon={faGasPump} size="lg" />
                                        &nbsp;
                                        {post.fuel}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <FontAwesomeIcon icon={faCity} size="lg" />
                                        &nbsp;
                                        {post.city}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item >
                                    <Typography variant="subtitle1" color="textSecondary" align="center" className="posfix">{t("bet")}</Typography>
                                    <Typography variant="h4" align="center" gutterBottom className="posfix">

                                        {post.price}
                                        €</Typography>
                                    <Typography variant="inherit" align="center" className="border padt">{showTimer(post)}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </NavLink>
                </Paper>))}
        </div>
    );
}
