import CustomAPIError from "./custom-api.js";
import StatusCodes from "../helpers/StatusCodes.js";

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
