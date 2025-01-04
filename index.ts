/**
 * Zephyr Framework
 * 
 * @author Sathya Molagoda
 * @version 1.0.0
 * @Created on 2024-11-15
 */
export {
  Controller,
  Service,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Connect,
  Options,
  Trace,
  Head,
  PathParam,
  QueryParam,
  BodyParam,
  RequestHeaders,
  FormData,
  Multipart,
} from "./decorator.js";

export { Headers, Response, PartData } from "./types.js";

export {
  getRequestHost,
  getRequestIP,
  getRequestProtocol,
  getRequestURL,
  isResponse,
  defaultMessages,
} from "./utils.js";

export { HttpStatus } from "./enums.js";

export { container } from "./dicontainer.js";

import ZephyrApp from "./app.js";

export default ZephyrApp;
