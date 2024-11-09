import { RequestHeaders } from "h3";
import { HttpStatus } from "./enums.js";

export type Headers = RequestHeaders;

export class Response {
    status: HttpStatus;
    body: any;
    message: string;
    headers: Record<string, string>;
  
    constructor(
      status: HttpStatus,
      body: any = null,
      message: string = "",
      headers: Record<string, string> = {}
    ) {
      this.status = status;
      this.body = body;
      this.message = message;
      this.headers = headers;
    }
  }
  