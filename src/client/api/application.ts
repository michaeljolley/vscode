import { Vonage } from "@vonage/server-sdk";
import { Application } from "@vonage/applications";
import { ApplicationTreeItem } from "../../views";
import { Telemetry } from "../../telemetry";

export class ApplicationAPI {
  constructor(private vonage: Vonage) {}

  async getApplications(): Promise<any> {
    try {
      const response = await this.vonage.applications.getApplicationPage({
        pageSize: 100,
      });
      return response._embedded.applications;
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent(
        "vonage:api:application:getApplications:error",
        { error: err.message },
      );
    }
    return [];
  }

  async getApplication(
    applicationId: string,
  ): Promise<Application | undefined> {
    try {
      return await this.vonage.applications.getApplication(applicationId);
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent(
        "vonage:api:application:getApplication:error",
        { error: err.message },
      );
    }
    return undefined;
  }

  async createApplication(state: {
    name: string;
    publicKey: string;
  }): Promise<boolean> {
    try {
      const application: Application = {
        name: state.name,
        keys: { publicKey: state.publicKey },
        capabilities: {},
      };
      const response =
        await this.vonage.applications.createApplication(application);
      if (response.id) {
        return true;
      }
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent(
        "vonage:api:application:createApplication:error",
        { error: err.message },
      );
    }
    return false;
  }

  async updateApplication(application: any): Promise<boolean> {
    try {
      const response =
        await this.vonage.applications.updateApplication(application);

      if (response.id) {
        return true;
      }
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent(
        "vonage:api:application:updateApplication:error",
        { error: err.message },
      );
    }
    return false;
  }

  async deleteApplication(node: ApplicationTreeItem): Promise<any> {
    try {
      await this.vonage.applications.deleteApplication(node.application.id);
      return true;
    } catch (err: any) {
      Telemetry.sendTelemetryErrorEvent(
        "vonage:api:application:deleteApplication:error",
        { error: err.message },
      );
    }
    return false;
  }
}
