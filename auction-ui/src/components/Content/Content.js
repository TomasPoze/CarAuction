import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsList from '../../pages/PostsList/PostsList';


export default () => (
    <Switch>
        <Route path="/auctions">
            <PostsList />
        </Route>
    </Switch>
)