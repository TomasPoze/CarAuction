import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default () => {

    const { i18n } = useTranslation()

    const { t } = useTranslation("common")

    const changeLanguage = lang => e => {
        e.preventDefault()
        i18n.changeLanguage(lang)
    }
    return (

        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/home">{t("title")}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">{t("home")}</Nav.Link>
                    <Nav.Link href="/auctions">{t("auctions")}</Nav.Link>
                    <Nav.Link href="#About">{t("about")}</Nav.Link>
                    <Nav.Link href="#Register">{t("register")}</Nav.Link>
                    <Nav.Link href="#SignIn">{t("signin")}</Nav.Link>
                    <NavDropdown id="basic-nav-dropdown">
                        <NavDropdown.Item href="#EN" onClick={changeLanguage('en')}>EN</NavDropdown.Item>
                        <NavDropdown.Item href="#LT" onClick={changeLanguage('lt')}>LT</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">{t("search")}</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}