import { MultiStepInput } from "../utils";

export interface LoginState {
  title: string;
  step: number;
  totalSteps: number;
  apiKey: string;
  apiSecret: string;
}

const title = "Provide Vonage API Credentials";

export abstract class LoginFlow {
  public static async collectInputs(): Promise<LoginState> {
    const state = {} as Partial<LoginState>;
    await MultiStepInput.run((input) => this.inputAPIKey(input, state));
    return state as LoginState;
  }

  private static async inputAPIKey(
    input: MultiStepInput,
    state: Partial<LoginState>,
  ) {
    state.apiKey = await input.showInputBox({
      title,
      step: 1,
      totalSteps: 2,
      value: typeof state.apiKey === "string" ? state.apiKey : "",
      prompt: "Vonage API Key",
      validate: this.validateString,
      shouldResume: this.shouldResume,
    });
    return (input: MultiStepInput) => this.inputAPISecret(input, state);
  }

  private static async inputAPISecret(
    input: MultiStepInput,
    state: Partial<LoginState>,
  ) {
    state.apiSecret = await input.showInputBox({
      title,
      step: 2,
      totalSteps: 2,
      value: typeof state.apiSecret === "string" ? state.apiSecret : "",
      prompt: "Vonage API Secret",
      validate: this.validateString,
      shouldResume: this.shouldResume,
    });
  }

  private static shouldResume() {
    // Could show a notification with the option to resume.
    return new Promise<boolean>((resolve, reject) => {
      // noop
    });
  }

  private static async validateString(value: string) {
    return value && value.trim().length > 0 ? undefined : "Required";
  }
}
