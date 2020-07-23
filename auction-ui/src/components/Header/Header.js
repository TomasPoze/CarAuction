import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";
import { setCredentials } from "../../api";
import { UserContext } from '../../App';
import { Link } from "react-router-dom";
import './style.css';



export default () => {

    const { i18n } = useTranslation()
    const { user, logout, loggedIn } = useContext(UserContext)

    const { t } = useTranslation("common")

    const changeLanguage = lang => e => {
        e.preventDefault()
        i18n.changeLanguage(lang)
    }

    const logoutClick = (e) => {
        e.preventDefault()
        setCredentials(null)
        logout()
    }

    const loggedInBlock = loggedIn() ?
        (<>
            <LinkContainer to="/user/info">
                <Nav.Link>{user.name} {user.lastName}</Nav.Link>
            </LinkContainer>
            <Nav.Link href="#" onClick={logoutClick}>Atsijungti</Nav.Link>
        </>) :
        (<>
            <LinkContainer to="/register" className="reg">
                <Nav.Link className="reg">{t("register")}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login" className="reg">
                <Nav.Link>{t("login")}</Nav.Link>
            </LinkContainer>
        </>)
    return (

        // <Navbar.Brand>
        //     <Link to="/">Scratch</Link>
        // </Navbar.Brand>

        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand>
                <Link to="/home">{t("title")}</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/home">
                        <Nav.Link>{t("home")}</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/auctions">
                        <Nav.Link>{t("auctions")}</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/about">
                        <Nav.Link>{t("about")}</Nav.Link>
                    </LinkContainer>
                    <NavDropdown title="" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#EN" onClick={changeLanguage('en')}>EN</NavDropdown.Item>
                        <NavDropdown.Item href="#LT" onClick={changeLanguage('lt')}>LT</NavDropdown.Item>
                    </NavDropdown>
                    {loggedInBlock}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

