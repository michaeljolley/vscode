import * as vscode from "vscode";
import { Vonage } from "@vonage/server-sdk";
import { Telemetry } from "../../telemetry";
import {
  NumbersAvailableNumber,
  NumbersOwnedNumber,
  NumbersUpdateParams,
} from "@vonage/numbers";
import { NumbersSearchFilter } from "@vonage/numbers/dist/types";
import { BuyNumberState } from "../../steps/buyNumberFlow";

export class NumbersAPI {
  constructor(private vonage: Vonage) {}

  async getNumbers(applicationId?: string): Promise<NumbersOwnedNumber[]> {
    let numbers: NumbersOwnedNumber[] = [];
    try {
      const ownedNumbers = await this.vonage.numbers.getOwnedNumbers({
        applicationId: applicationId,
        hasApplication: applicationId !== undefined,
      });
      numbers = ownedNumbers.numbers || [];
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent("vonage:api:numbers:getNumbers:error", {
        error: err.message,
      });
    }

    return numbers;
  }

  async buyNumber(state: BuyNumberState): Promise<boolean> {
    try {
      const numberParams: NumbersUpdateParams = {
        country: state.country,
        msisdn: state.msisdn,
      };

      const response = await this.vonage.numbers.buyNumber(numberParams);
      if (!response.errorCode) {
        return true;
      } else {
        Telemetry.sendTelemetryErrorEvent(
          "vonage:api:numbers:buyNumber:error",
          {
            error: response.errorCode,
          },
        );
        vscode.window.showErrorMessage(
          `There was a problem buying the number. The error returned was: (${response.errorCode}) ${response.errorCodeLabel}.`,
        );
      }
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent("vonage:api:numbers:buyNumber:error", {
        error: err.message,
      });
    }
    return false;
  }

  async assignToApplication(
    number: NumbersOwnedNumber,
    applicationId: string,
  ): Promise<boolean> {
    try {
      const numberParams: NumbersUpdateParams = {
        applicationId: applicationId,
        msisdn: number.msisdn as string,
        country: number.country as string,
      };
      const response = await this.vonage.numbers.updateNumber(numberParams);
      if (!response.errorCode) {
        return true;
      } else {
        Telemetry.sendTelemetryErrorEvent(
          "vonage:api:numbers:assignToApplication:error",
          {
            error: response.errorCode,
          },
        );
        vscode.window.showErrorMessage(
          `There was a problem buying the number. The error returned was: (${response.errorCode}) ${response.errorCodeLabel}.`,
        );
      }
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent(
        "vonage:api:numbers:assignToApplication:error",
        {
          error: err.message,
        },
      );
    }
    return false;
  }

  async unassignNumber(number: NumbersOwnedNumber): Promise<boolean> {
    try {
      const numberParams: NumbersUpdateParams = {
        msisdn: number.msisdn as string,
        country: number.country as string,
      };
      const response = await this.vonage.numbers.updateNumber(numberParams);
      if (!response.errorCode) {
        return true;
      } else {
        Telemetry.sendTelemetryErrorEvent(
          "vonage:api:numbers:unassignNumber:error",
          {
            error: response.errorCode,
          },
        );
        vscode.window.showErrorMessage(
          `There was a problem unassigning the number. The error returned was: (${response.errorCode}) ${response.errorCodeLabel}.`,
        );
      }
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent(
        "vonage:api:numbers:unassignNumber:error",
        {
          error: err.message,
        },
      );
    }
    return false;
  }

  async searchNumbers(state: any): Promise<NumbersAvailableNumber[]> {
    try {
      const searchFilter: NumbersSearchFilter = {
        country: state.country,
        pattern: state.pattern,
        searchPattern: state.search_pattern,
        type: state.type,
        features: state.features,
      };

      const response =
        await this.vonage.numbers.getAvailableNumbers(searchFilter);
      return response.numbers || [];
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent(
        "vonage:api:numbers:searchNumbers:error",
        {
          error: err.message,
        },
      );
    }
    return [];
  }

  async cancelNumber(number: NumbersOwnedNumber): Promise<boolean> {
    try {
      const numberParams: NumbersUpdateParams = {
        msisdn: number.msisdn as string,
        country: number.country as string,
      };
      const response = await this.vonage.numbers.cancelNumber(numberParams);
      if (!response.errorCode) {
        return true;
      } else {
        Telemetry.sendTelemetryErrorEvent(
          "vonage:api:numbers:cancelNumber:error",
          {
            error: response.errorCode,
          },
        );
        vscode.window.showErrorMessage(
          `There was a problem canceling the number. The error returned was: (${response.errorCode}) ${response.errorCodeLabel}.`,
        );
      }
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent(
        "vonage:api:numbers:cancelNumber:error",
        {
          error: err.message,
        },
      );
    }
  }
}
