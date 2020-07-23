import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostsList from '../../pages/PostsList/PostsList';
import PostPage from '../../pages/PostPage/PostPage';
import PostForm from '../../pages/PostForm/PostForm';
import Login from '../../pages/Login/Login';
import Home from '../../pages/Home/Home';
import Register from '../../pages/Register/Register';
import About from '../../pages/About/About';
import UserInfo from '../../pages/UserInfo/UserInfo';
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export default () => (
    <Switch>
        <Redirect exact from="/" to="/home" />

        <Route path="/login">
            <Login />
        </Route>

        <PrivateRoute exact path="/posts/post">
            <PostForm />
        </PrivateRoute>

        <Route path="/posts/:id">
            <PostPage />
        </Route>

        <Route path="/auctions">
            <PostsList />
        </Route>

        <Route path="/home">
            <Home />
        </Route>

        <Route path="/register">
            <Register/>
        </Route>

        <Route path="/about">
            <About/>
        </Route>

        <PrivateRoute path="/user/info">
            <UserInfo/>
        </PrivateRoute>

        <Route>
            <h1>Puslapis nerastas!</h1>
        </Route>
    </Switch>
)