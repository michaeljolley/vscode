/* eslint-disable @typescript-eslint/naming-convention */
import { LineType } from "@vonage/numbers/dist/enums/LineType";
import { Feature } from "@vonage/numbers/dist/enums/Feature";

export const vonage = {
  loginStateValidMock: {
    title: "",
    step: 2,
    totalSteps: 2,
    apiKey: "fakeApiKey",
    apiSecret: "fakeApiSecret",
  },
  loginStateInvalidMock: {
    title: "",
    step: 2,
    totalSteps: 2,
    apiKey: "",
    apiSecret: "fakeApiSecret",
  },
  numberMock: {
    msisdn: "15555555555",
    type: LineType.LANDLINE,
    country: "US",
    cost: "0",
    features: [Feature.VOICE, Feature.SMS],
    moHttpUrl: "",
    messagesCallbackType: "",
    messagesCallbackValue: "",
    voiceCallbackType: "",
    voiceCallbackValue: "",
  },
  applicationMock: {
    id: "78d335fa-323d-0114-9c3d-d6f0d48968cf",
    name: "My Application",
    capabilities: {
      voice: {
        webhooks: {
          answer_url: {
            address: "https://example.com/webhooks/answer",
            http_method: "POST",
            connection_timeout: 500,
            socket_timeout: 3000,
          },
          fallback_answer_url: {
            address: "https://fallback.example.com/webhooks/answer",
            http_method: "POST",
            connection_timeout: 500,
            socket_timeout: 3000,
          },
          event_url: {
            address: "https://example.com/webhooks/event",
            http_method: "POST",
            connection_timeout: 500,
            socket_timeout: 3000,
          },
        },
      },
      messages: {
        webhooks: {
          inbound_url: {
            address: "https://example.com/webhooks/inbound",
            http_method: "POST",
          },
          status_url: {
            address: "https://example.com/webhooks/status",
            http_method: "POST",
          },
        },
      },
      rtc: {
        webhooks: {
          event_url: {
            address: "https://example.com/webhooks/event",
            http_method: "POST",
          },
        },
      },
      vbc: {},
    },
  },
};
