import { Vonage } from "@vonage/server-sdk";
import { Telemetry } from "../../telemetry";

export class AccountAPI {
  constructor(private vonage: Vonage) {}

  public async getBalance(): Promise<number> {
    try {
      var balance = await this.vonage.accounts.getBalance();
      return balance.value;
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent("vonage:api:account:getBalance:error", {
        error: err.message,
      });
    }
    return 0;
  }
}
