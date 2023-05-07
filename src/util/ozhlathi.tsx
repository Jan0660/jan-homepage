import { Axios } from "axios";
import { Notification } from "../SideBar";

export class OzhlathiClient {
  private _axios: Axios;

  constructor(baseUrl: string, password: string) {
    this._axios = new Axios({
      baseURL: baseUrl,
      headers: { Authorization: password },
    });
  }

  public async getNotifications(): Promise<Notification[]> {
    let res = await this._axios.get("/notifications");
    return JSON.parse(res.data);
  }

  public async getConfig(): Promise<any>{
    let res = await this._axios.get("/config");
    console.log(res);
    return JSON.parse(res.data);
  }

  public setConfig(config: any): Promise<void>{
    return this._axios.post("/config", config);
  }
}
