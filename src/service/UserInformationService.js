import AppDataService from "./AppDataService";

// const COMMON_BASE= "auth";

export default class UserInformationService {
  static async getLoginUserInforamtion() {
    return await AppDataService.get(`api/user/get-logged-user`);
  }

  static async getAllUserInformation() {
    return await AppDataService.get(`api/user/get-all-users`);
  }
}
