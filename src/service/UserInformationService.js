import AppDataService from "./AppDataService";

// const COMMON_BASE= "auth";

export default class UserInformationService {
  static async getLoginUserInforamtion() {
    console.log("user logini info called in service");
    return await AppDataService.get(`api/user/get-logged-user`);
  }
}
