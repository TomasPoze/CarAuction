import axios from 'axios';

export default {
    fetchPosts(){
        return axios.get('http://localhost:8080/posts')
    }
}