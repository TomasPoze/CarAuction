import React, { useEffect, useState } from 'react';
import postsApi from '../../api/postsApi';
import {NavLink} from 'react-router-dom';


export default () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postsApi.fetchPosts()
            .then(response => setPosts(response.data))
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {posts.map(post => (
                    <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.price}</td>
                        <td><NavLink to={`/post/${post.id}`}>More</NavLink></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}