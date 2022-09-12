import CustomAPIError from './custom-api.js';
import StatusCodes from "../helpers/StatusCodes.js";

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
