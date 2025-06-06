/**
 * This file contains the types used in the framework.
 * 
 * @author Sathya Molagoda
 * @version 1.0.0
 * @created 2024-12-25
 */

import { MultiPartData, RequestHeaders } from "h3";
import { HttpStatus } from "./enums.js";

export type Headers = RequestHeaders;

export type PartData = MultiPartData;

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

export type Constructor<T = any> = new (...args: any[]) => T;
