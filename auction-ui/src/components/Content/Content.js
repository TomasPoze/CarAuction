import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostsList from '../../pages/PostsList/PostsList';
import PostPage from '../../pages/PostPage/PostPage';
import PostForm from '../../pages/PostForm/PostForm';


export default () => (
    <Switch>
        <Redirect exact from="/" to="/home" />
        
        <Route exact path="/posts/post">
            <PostForm />
        </Route>

        <Route path="/posts/:id">
            <PostPage />
        </Route>

        <Route path="/auctions">
            <PostsList />
        </Route>

        <Route path="/posts/:id">
            <PostPage />
        </Route>

        <Route>
            <h1>Puslapis nerastas!</h1>
        </Route>
    </Switch>
)