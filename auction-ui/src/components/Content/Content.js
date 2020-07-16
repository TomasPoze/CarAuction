import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostsList from '../../pages/PostsList/PostsList';
import PostPage from '../../pages/PostPage/PostPage';
import PostForm from '../../pages/PostForm/PostForm';
import Login from '../../pages/Login/Login';
import Home from '../../pages/Home/Home';
import Register from '../../pages/Register/Register';


export default () => (
    <Switch>
        <Redirect exact from="/" to="/home" />

        <Route path="/login">
            <Login />
        </Route>

        <Route exact path="/posts/post">
            <PostForm />
        </Route>

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

        <Route>
            <h1>Puslapis nerastas!</h1>
        </Route>
    </Switch>
)