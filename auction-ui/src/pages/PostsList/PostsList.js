import React, { useEffect, useState } from 'react';
import postsApi from '../../api/postsApi';
import { NavLink, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { faCalendarAlt, faTachometerAlt, faGasPump, faCogs, faCity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.css';
// import { Button } from 'react-bootstrap';

//         <Button variant="warning">
//                 <NavLink to={'/posts/post'}>Sukurti</NavLink>
//         </Button>
//         </>
//     )
// }


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
    const classes = useStyles();



    const [posts, setPosts] = useState([]);




    useEffect(() => {
        postsApi.fetchPosts()
            .then(response => setPosts(response.data))
    }, [])

    // {posts.map(post => (
    //     <tr key={post.id}>
    //         <td>{post.title}</td>
    //         <td>{post.price}</td>
    //         <td><NavLink to={`/posts/${post.id}`}>More</NavLink></td>
    //     </tr>
    // ))}

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
                                        <img className={classes.img} src={`http://localhost:8080/files/${post.fileName}`} alt="Car photo"></img>
                                    }
                                    {/* <img className={classes.img} alt="complex" src="https://s.elenta.lt/units/680029/photos637141846519172263/1f.jpg" /> */}
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
                                    {/* <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                Remove
                                </Typography>
                            </Grid> */}
                                </Grid>
                                <Grid item >
                                    <Typography variant="subtitle1" color="textSecondary" align="center" className="posfix">Dabartinis statymas</Typography>
                                    <Typography variant="h4" align="center" gutterBottom className="posfix">{post.price}€</Typography>
                                    <Typography variant="inherit" align="center" className="border padt">Iki pabaigos: 12:23:11</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </NavLink>
                </Paper>))}
        </div>
    );
}
