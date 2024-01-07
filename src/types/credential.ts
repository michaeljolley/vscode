export interface ICredential {
  apiKey?: string;
  apiSecret?: string;

  isAuthenticated(): boolean;
}

export class Credential implements ICredential {
  constructor(
    public apiKey?: string,
    public apiSecret?: string,
  ) {}

  public isAuthenticated(): boolean {
    if (this.apiKey && this.apiSecret) {
      return true;
    }
    return false;
  }
}
