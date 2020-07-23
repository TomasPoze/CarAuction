import React from 'react';
import './style.css';

import { useTranslation } from "react-i18next";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        minWidth: 200,
        width: 600,
        height: 500
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 350,
    },
});
export default () => {
    const { i18n } = useTranslation()
    const { t } = useTranslation("home")
    
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Container maxWidth="lg">
            <div className="flex">
                <div className="center bg-img1">
                    <div>
                        <a className="but-pos" href="/auctions">{t("auctions")}</a>
                    </div>
                </div>

                <div className="pl-5">
                <div className="center bg-img2">
                    <div>
                        <a className="but-pos2" href="/posts/post">{t("create")}</a>
                    </div>
                </div>
                </div>

            </div>
        </Container>
    )
}