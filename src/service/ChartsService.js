import AppDataService from "./AppDataService";

// const COMMON_BASE= "auth";

export default class ChartService {
  static async getAllCharts() {
    return await AppDataService.get(`api/chat/get-all-chats`);
  }
  static async postNewChart(data) {
    return await AppDataService.post(`api/chat/create-new-chat`, {
      members: data,
    });
  }
  static async createNewMsg(data) {
    return await AppDataService.post(`api/message/new-message`, data);
  }
  static async getAllMessage(id) {
    return await AppDataService.get(`api/message/get-all-messages/${id}`);
  }
}
