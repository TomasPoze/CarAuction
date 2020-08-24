import HTTP from '.';

export default {
    fetchPosts() {
        return HTTP.get(`/posts`)
    },
    fetchPostById(id) {
        return HTTP.get(`/posts/${id}`);
    },
    deletePostById(id){
        return HTTP.get(`/posts/${id}/delete`)
    },
    createPost(post, file) {
        let data = new FormData();
        data.append("file", file);
        data.append("make", post.make);
        data.append("model", post.model);
        data.append("year", post.year);
        data.append("km", post.km);
        data.append("gearbox", post.gearbox);
        data.append("fuel", post.fuel);
        data.append("city", post.city);
        data.append("price", post.price);
        data.append("post_time",post.postTime);
        data.append("bet_time",post.betTime);
        return HTTP.post('/posts/post', data);
    },
}
