import HTTP from '.';

export default {
    fetchPosts() {
        return HTTP.get('http://localhost:8080/posts')
    },
    fetchPostById(id) {
        return HTTP.get(`/posts/${id}`);
    },
    createPost(post, file) {
        let data = new FormData();
        data.append("file", file);
        data.append("title", post.title);
        data.append("price", post.price);
        return HTTP.post('/posts/post', data);
    }
}