import AppDataService from "./AppDataService";

// const COMMON_BASE= "auth";

export default class AuthDataService {
  static async postsignup(data) {
    console.log("daata in service", data);

    return await AppDataService.post(`api/auth/signup`, data);
  }
}
