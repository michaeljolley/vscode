import { Vonage } from "@vonage/server-sdk";
import { Auth } from "@vonage/auth";
import { authStatusEventEmitter } from "../emitters";
import { Credential } from "../types/credential";
import { AccountAPI } from "./api/account";
import { ApplicationAPI } from "./api/application";
import { NumbersAPI } from "./api/numbers";

export abstract class VonageClient {
  private static _client: Vonage;

  public static initialize() {
    authStatusEventEmitter.event(this.authStatusChanged);
  }

  private static authStatusChanged(credential: Credential) {
    if (credential.isAuthenticated()) {
      this._client = new Vonage(
        new Auth({
          apiKey: credential.apiKey,
          apiSecret: credential.apiSecret,
        }),
      );

      this.account = new AccountAPI(this._client);
      this.application = new ApplicationAPI(this._client);
      this.numbers = new NumbersAPI(this._client);
    } else {
      this._client = new Vonage(
        new Auth({
          apiKey: "",
          apiSecret: "",
        }),
      );
    }
  }
  public static account: AccountAPI;
  public static application: ApplicationAPI;
  public static numbers: NumbersAPI;
}
