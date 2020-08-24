import React from 'react';
import './style.css';
import { useTranslation } from "react-i18next";
import Container from '@material-ui/core/Container';
import { LinkContainer } from 'react-router-bootstrap';


export default () => {
    const { t } = useTranslation("home")

    return (
        <Container maxWidth="lg">
            <div className="flex">
                <div className="center bg-img1">
                    <LinkContainer to="/auctions">
                        <a className="but-pos" href="/#">{t("auctions")}</a>
                    </LinkContainer>
                </div>

                <div className="pl-5">
                    <div className="center bg-img2">
                        <LinkContainer to="/posts/post">
                            <a className="but-pos2" href="/#">{t("create")}</a>
                        </LinkContainer>
                    </div>
                </div>
            </div>
        </Container>
    )
}