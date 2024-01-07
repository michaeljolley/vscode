import { commands } from "vscode";

export abstract class Subscriptions {
  subscriptions: { dispose(): any }[] = [];

  public static activate(
    subscriptions: {
      dispose(): any;
    }[],
  ) {}

  public static dispose(): void {}
}
