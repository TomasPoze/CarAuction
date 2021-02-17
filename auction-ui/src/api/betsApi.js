import HTTP from '.';

export default {
  fetchBetById(id){
    return HTTP.get(`/bets/${id}`)
},
fetchBets(postId){
    return HTTP.get(`/bets?postId=${postId}`)
},
fetchBetsAll(){
    return HTTP.get(`/bets/all`)
},
  createBet(bet){
    let data = new FormData();
    data.append("city",bet.city);
    data.append("date",bet.date);
    data.append("sum",bet.sum);
    data.append("username",bet.username);
    data.append("post_id",bet.postId);
    return HTTP.post('/bets/bet',data);
},

}