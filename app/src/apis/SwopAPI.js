import axios from "axios";
//const base_url = "http://127.0.0.1:8080";
const base_url = "http://ec2-18-144-90-64.us-west-1.compute.amazonaws.com:8080";

function get(route, params) {
  return axios.get(base_url + route, params);
}
function post(route, params) {
  return axios.post(base_url + route, params);
}

class SwopApi {
  static async getTest() {
    const data = await get("/test", {
      params: {},
    });
    return data.data;
  }

  static async getUserProducts(user_id) {
    const data = await get("/get_products", {
      params: {user_id: user_id},
    });
    return data.data;
  }
}

export default SwopApi;
