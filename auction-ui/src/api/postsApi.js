import HTTP from '.';

export default {
    fetchPosts() {
        return HTTP.get(`/posts`)
    },
    fetchPostById(id) {
        return HTTP.get(`/posts/${id}`);
    },
    fetchBetById(id){
        return HTTP.get(`/bets/${id}`)
    },
    fetchBets(postId){
        return HTTP.get(`/bets?postId=${postId}`)
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
        return HTTP.post('/posts/post', data);
    },
    createBet(bet){
        let data = new FormData();
        data.append("city",bet.city);
        data.append("date",bet.date);
        data.append("sum",bet.sum);
        data.append("username",bet.username);
        data.append("post_id",bet.postId);
        return HTTP.post('/bets/bet',data);
    }
}