import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import postsApi from '../../api/postsApi';

export default () => {
    const { id } = useParams();

    const [post, setPost] = useState({});

    useEffect(() => {
        postsApi.fetchPostById(id)
            .then(resp => setPost(resp.data));
    }, [id])

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.price}</p>
            {post.fileName &&
                <img src={`http://localhost:8080/files/${post.fileName}`} alt="Car photos"></img>
            }
        </div>
    )
};