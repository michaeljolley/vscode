import { getHTTPMethods, MultiStepInput } from "../utils";
import { ApplicationTreeItem } from "../views";

export interface RTCCapabilityState {
  title: string;
  step: number;
  totalSteps: number;
  eventUrlAddress: string;
  eventUrlHttpMethod: string;
  eventUrlConnectionTimeout: string;
  eventUrlSocketTimeout: string;
}

export abstract class RTCCapabilityFlow {
  private static title = "";

  public static async collectInputs(
    title: string,
    existingState?: ApplicationTreeItem,
  ): Promise<RTCCapabilityState> {
    const state = {} as Partial<RTCCapabilityState>;
    this.title = title;

    if (existingState) {
      state.eventUrlAddress =
        existingState.application.capabilities.rtc.webhooks.event_url.address;
      state.eventUrlHttpMethod =
        existingState.application.capabilities.rtc.webhooks.event_url.http_method;
    }

    await MultiStepInput.run((input) =>
      this.inputEventUrlAddress(input, state),
    );
    return state as RTCCapabilityState;
  }

  private static async inputEventUrlAddress(
    input: MultiStepInput,
    state: Partial<RTCCapabilityState>,
  ) {
    state.eventUrlAddress = await input.showInputBox({
      title: this.title,
      step: 1,
      totalSteps: 2,
      value:
        typeof state.eventUrlAddress === "string" ? state.eventUrlAddress : "",
      prompt: "Event Webhook Url",
      validate: this.validateAddress,
      shouldResume: this.shouldResume,
    });
    return (input: MultiStepInput) => this.inputEventHttpMethod(input, state);
  }

  private static async inputEventHttpMethod(
    input: MultiStepInput,
    state: Partial<RTCCapabilityState>,
  ) {
    const result = await input.showQuickPick({
      title: this.title,
      step: 1,
      totalSteps: 2,
      placeholder: "Event Webhook Http Method",
      items: getHTTPMethods(),
      activeItem:
        typeof state.eventUrlHttpMethod !== "string"
          ? state.eventUrlHttpMethod
          : undefined,
      shouldResume: this.shouldResume,
    });
    state.eventUrlHttpMethod = result.label;
  }

  private static shouldResume() {
    // Could show a notification with the option to resume.
    return new Promise<boolean>((resolve, reject) => {
      // noop
    });
  }

  private static async validateAddress(address: string) {
    return address && address.trim().length > 0
      ? undefined
      : "Address is required";
  }
}
