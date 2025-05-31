import AppDataService from "./AppDataService";

// const COMMON_BASE= "auth";

export default class LoginDataService {
  static async postLogin(data) {
    console.log("daata in service", data);

    return await AppDataService.post(`api/auth/login`, data);
  }
}
