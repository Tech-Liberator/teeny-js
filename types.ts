import { RequestHeaders } from "h3";
import { HttpStatus } from "./enums.js";
import { defaultMessages } from "./utils.js";

export type Headers = RequestHeaders;

export class ResponseEntity {
  status: HttpStatus;
  message: string;
  body: any;

  // Overload signatures
  constructor(httpStatus: HttpStatus);
  constructor(httpStatus: HttpStatus, message: string);
  constructor(httpStatus: HttpStatus, body: any);
  constructor(httpStatus: HttpStatus, message: string, body: any);

  // Single constructor implementation

  constructor(
    httpStatus: HttpStatus,
    messageOrBody?: string | any,
    body?: any
  ) {
    let message = "";
    let responseBody: any = null;

     // Case 1: If the first argument is a string (message) and second argument exists, treat them as message and body
     if (typeof messageOrBody === "string" && typeof body !== 'undefined') {
      message = messageOrBody;
      responseBody = body;
    }
    // Case 2: If the first argument is a string (message), but no second argument is provided, treat it as message only
    else if (typeof messageOrBody === "string") {
      message = messageOrBody;
    }
    // Case 3: If the first argument is not a string, treat it as body and use a default message
    else if (typeof messageOrBody !== 'undefined') {
      responseBody = messageOrBody;
      message = defaultMessages[httpStatus]; // Default message based on HttpStatus
    }
    // Case 4: If no second argument is provided, just set the default message
    else {
      message = defaultMessages[httpStatus];
    }

    // Set the instance variables
    this.status = httpStatus;
    this.message = message;
    this.body = responseBody;
  }
}
