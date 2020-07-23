import HTTP from '.'

export default {
    getUser() {
        return HTTP.get('/user')
    },
    createUser(user){
        let data = new FormData();
        data.append("username",user.username);
        data.append("name",user.name);
        data.append("last_name",user.lastName);
        data.append("city",user.city);
        data.append("password",user.password);
        return HTTP.post('/user/register',data);
    },

    updateUser(user){
        let data = new FormData();
        data.set("username",user.username);
        data.set("name",user.name);
        data.set("last_name",user.lastName);
        data.set("city",user.city);
        return HTTP.post('/user/info',data);
    }
}
