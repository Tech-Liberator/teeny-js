import { HttpStatus } from "./enums.js";
import { Headers, ResponseEntity } from "./types.js";

export function getRequestHost(headers: Headers) {
  return headers["X-Forwarded-Host"] || headers["x-forwarded-host"];
}

export function getRequestProtocol(headers: Headers) {
  return headers["X-Forwarded-Proto"] || headers["x-forwarded-proto"];
}

export function getRequestURL(headers: Headers) {
  return `${headers["X-Forwarded-Proto"]}://${headers["X-Forwarded-Host"]}`;
}

export function getRequestIP(headers: Headers) {
  return headers["X-Forwarded-For"] || headers["x-forwarded-for"];
}

// Define a map of default messages for HttpStatus codes
export const defaultMessages: { [key: number]: string } = {
  [HttpStatus.CONTINUE]: "Continue",
  [HttpStatus.SWITCHING_PROTOCOLS]: "Switching Protocols",
  [HttpStatus.PROCESSING]: "Processing",
  [HttpStatus.OK]: "OK",
  [HttpStatus.CREATED]: "Created",
  [HttpStatus.ACCEPTED]: "Accepted",
  [HttpStatus.NON_AUTHORITATIVE_INFORMATION]: "Non-Authoritative Information",
  [HttpStatus.NO_CONTENT]: "No Content",
  [HttpStatus.RESET_CONTENT]: "Reset Content",
  [HttpStatus.PARTIAL_CONTENT]: "Partial Content",
  [HttpStatus.MULTI_STATUS]: "Multi-Status",
  [HttpStatus.ALREADY_REPORTED]: "Already Reported",
  [HttpStatus.IM_USED]: "IM Used",
  [HttpStatus.MULTIPLE_CHOICES]: "Multiple Choices",
  [HttpStatus.MOVED_PERMANENTLY]: "Moved Permanently",
  [HttpStatus.FOUND]: "Found",
  [HttpStatus.SEE_OTHER]: "See Other",
  [HttpStatus.NOT_MODIFIED]: "Not Modified",
  [HttpStatus.USE_PROXY]: "Use Proxy",
  [HttpStatus.TEMPORARY_REDIRECT]: "Temporary Redirect",
  [HttpStatus.PERMANENT_REDIRECT]: "Permanent Redirect",
  [HttpStatus.BAD_REQUEST]: "Bad Request",
  [HttpStatus.UNAUTHORIZED]: "Unauthorized",
  [HttpStatus.PAYMENT_REQUIRED]: "Payment Required",
  [HttpStatus.FORBIDDEN]: "Forbidden",
  [HttpStatus.NOT_FOUND]: "Not Found",
  [HttpStatus.METHOD_NOT_ALLOWED]: "Method Not Allowed",
  [HttpStatus.NOT_ACCEPTABLE]: "Not Acceptable",
  [HttpStatus.PROXY_AUTHENTICATION_REQUIRED]: "Proxy Authentication Required",
  [HttpStatus.REQUEST_TIMEOUT]: "Request Timeout",
  [HttpStatus.CONFLICT]: "Conflict",
  [HttpStatus.GONE]: "Gone",
  [HttpStatus.LENGTH_REQUIRED]: "Length Required",
  [HttpStatus.PRECONDITION_FAILED]: "Precondition Failed",
  [HttpStatus.PAYLOAD_TOO_LARGE]: "Payload Too Large",
  [HttpStatus.URI_TOO_LONG]: "URI Too Long",
  [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: "Unsupported Media Type",
  [HttpStatus.RANGE_NOT_SATISFIABLE]: "Range Not Satisfiable",
  [HttpStatus.EXPECTATION_FAILED]: "Expectation Failed",
  [HttpStatus.I_AM_A_TEAPOT]: "I'm a teapot",
  [HttpStatus.UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
  [HttpStatus.LOCKED]: "Locked",
  [HttpStatus.FAILED_DEPENDENCY]: "Failed Dependency",
  [HttpStatus.TOO_EARLY]: "Too Early",
  [HttpStatus.UPGRADE_REQUIRED]: "Upgrade Required",
  [HttpStatus.PRECONDITION_REQUIRED]: "Precondition Required",
  [HttpStatus.TOO_MANY_REQUESTS]: "Too Many Requests",
  [HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE]: "Request Header Fields Too Large",
  [HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS]: "Unavailable For Legal Reasons",
  [HttpStatus.INTERNAL_SERVER_ERROR]: "Internal Server Error",
  [HttpStatus.NOT_IMPLEMENTED]: "Not Implemented",
  [HttpStatus.BAD_GATEWAY]: "Bad Gateway",
  [HttpStatus.SERVICE_UNAVAILABLE]: "Service Unavailable",
  [HttpStatus.GATEWAY_TIMEOUT]: "Gateway Timeout",
  [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: "HTTP Version Not Supported",
  [HttpStatus.VARIANT_ALSO_NEGOTIATES]: "Variant Also Negotiates",
  [HttpStatus.INSUFFICIENT_STORAGE]: "Insufficient Storage",
  [HttpStatus.LOOP_DETECTED]: "Loop Detected",
  [HttpStatus.NOT_EXTENDED]: "Not Extended",
  [HttpStatus.NETWORK_AUTHENTICATION_REQUIRED]: "Network Authentication Required",
};


export function createResponse<T>(statusCode: number, message: string, data: T) {
  return new ResponseEntity(statusCode, message, data);
}

export function isResponseEntity(result: any): result is ResponseEntity {
  return result instanceof ResponseEntity;
}