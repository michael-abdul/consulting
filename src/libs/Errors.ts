export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,

}

export enum Message {
  SOMETHING_WENT_WRONG = " Something went wrong!",
  NO_DATA_FOUND = "No data is found!",
  CREATE_FAILED = "Create is failed!",
  UPDATE_FAILED = "Update is failed!",
  TOKEN_CREATION_FAILED = "Token creation error!",
  USED_NICK_PHONE = "You are inserting already used nick or phone!",
  NO_MEMBER_NICK = "No member with member nick!",
  BLOCKED_USER = "You have been blocked!, contact restaurant!",
  WRONG_PASSWORD = "Wrong password please try again!",
  NOT_AUTHENTICATED = "You are not athenticated, Please login first",
  REMOVE_FAILED = "Remove failed"
}

class Errors extends Error {
  public code: HttpCode;
  public message: Message;

  static readonly standard = {
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: Message.SOMETHING_WENT_WRONG,
  };
  constructor(statusCode: HttpCode, statusMessage: Message) {
    super();
    this.code = statusCode;
    this.message = statusMessage;
  }
}
export default Errors;
