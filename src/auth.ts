import {
  commands,
  EventEmitter,
  ExtensionContext,
  SecretStorage,
  window,
} from "vscode";
import { Credential } from "./types/credential";

const _apiKeyStoreName = "vonage:apiKey";
const _apiSecretStoreName = "vonage:apiSecret";

export abstract class Auth {
  private static secretStorage: SecretStorage;
  private static authStatusEventEmitter: EventEmitter<Credential>;

  public static initialize(
    context: ExtensionContext,
    authStatusEventEmitter: EventEmitter<Credential>,
  ) {
    this.secretStorage = context.secrets;
    this.authStatusEventEmitter = authStatusEventEmitter;
  }

  private static validateCredentials = (
    apiKey?: string,
    apiSecret?: string,
  ): boolean => {
    if (
      apiKey &&
      apiKey.trim().length > 0 &&
      apiSecret &&
      apiSecret.trim().length > 0
    ) {
      return true;
    }
    return false;
  };

  public static async login(
    apiKey?: string,
    apiSecret?: string,
  ): Promise<void> {
    if (this.validateCredentials(apiKey, apiSecret) && this.secretStorage) {
      await this.secretStorage.store(_apiKeyStoreName, apiKey as string);
      await this.secretStorage.store(_apiSecretStoreName, apiSecret as string);

      commands.executeCommand("setContext", "vonage:authenticated", true);
      this.authStatusEventEmitter.fire(new Credential(apiKey, apiSecret));
      return;
    }

    window.showErrorMessage(`The API key & secret provided were not invalid.`);
  }

  public static async logout(): Promise<void> {
    if (this.secretStorage) {
      await this.secretStorage.delete(_apiKeyStoreName);
      await this.secretStorage.delete(_apiSecretStoreName);
    }

    commands.executeCommand("setContext", "vonage:authenticated", false);
    this.authStatusEventEmitter.fire(new Credential(undefined, undefined));
  }

  public static async getCredentials(): Promise<Credential> {
    if (this.secretStorage) {
      const apiKey = await this.secretStorage.get(_apiKeyStoreName);
      const apiSecret = await this.secretStorage.get(_apiSecretStoreName);

      if (apiKey && apiSecret) {
        return new Credential(apiKey, apiSecret);
      }
    }
    return new Credential();
  }

  public static async isAuthenticated(): Promise<boolean> {
    const credentials = await this.getCredentials();
    return credentials.isAuthenticated();
  }
}
