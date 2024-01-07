import * as assert from "assert";
import * as Sinon from "sinon";
import * as vscode from "vscode";
import { AuthCommands } from "../../../commands";
import { mocks } from "../../mocks/vscode";
import { vonage } from "../../mocks/vonage";
import { Auth } from "../../../auth";
import { LoginFlow } from "../../../steps";
import { Telemetry } from "../../../telemetry";

suite("Commands:Auth", function () {
  const authCommands: AuthCommands = new AuthCommands(
    mocks.extensionContextMock.subscriptions,
  );
  const telemetryStub = Sinon.stub(Telemetry, "sendTelemetryEvent");

  this.beforeEach(() => {
    telemetryStub.resetHistory();
  });

  this.afterAll(() => {
    telemetryStub.restore();
  });

  test("login renders correct user flow", async () => {
    const loginFlowStub = Sinon.stub(LoginFlow, "collectInputs").returns(
      Promise.resolve(vonage.loginStateInvalidMock),
    );

    await authCommands.login();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(loginFlowStub.calledOnce, true);
    loginFlowStub.restore();
  });

  test("error message displays when missing api key or secret", async () => {
    const windowShowErrorMessageStub = Sinon.stub(
      vscode.window,
      "showErrorMessage",
    );
    const loginFlowStub = Sinon.stub(LoginFlow, "collectInputs").returns(
      Promise.resolve(vonage.loginStateInvalidMock),
    );

    await authCommands.login();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(windowShowErrorMessageStub.calledOnce, true);
    windowShowErrorMessageStub.restore();
    loginFlowStub.restore();
  });

  test("calls Auth.login when api key and secret are provided", async () => {
    const loginFlowStub = Sinon.stub(LoginFlow, "collectInputs").returns(
      Promise.resolve(vonage.loginStateValidMock),
    );
    const authLoginStub = Sinon.stub(Auth, "login");

    await authCommands.login();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(authLoginStub.calledOnce, true);

    authLoginStub.restore();
    loginFlowStub.restore();
  });

  test("logout calls auth logout", async () => {
    const stub = Sinon.stub(Auth, "logout");

    await authCommands.logout();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });
});
