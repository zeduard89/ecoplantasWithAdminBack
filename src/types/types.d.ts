  export interface IAdmin {
    userName: string;
    lastName?: string;
    email?: string;
    password: string;
  }

  export interface IErrrorMessage {
    errorMessage?: string;
  }

export  interface TokenPayload {
    tokenEmail: string;
    iat: number;
    exp: number;
}