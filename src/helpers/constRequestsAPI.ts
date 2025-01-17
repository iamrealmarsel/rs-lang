export enum UrlPath {
  BASE = 'https://rs-lang-be-mars.herokuapp.com',
  WORDS = 'words',
  USERS = 'users',
  SIGNIN = 'signin',
  TOKENS = 'tokens',
  AGGREGATED = 'aggregatedWords',
  STATISTICS = 'statistics',
  SETTINGS = 'settings',
}

export enum Headers {
  TYPE = 'application/json',
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export enum ErrorMessage {
  BAD_REQUEST = 'Bad request',
  SETTING_NOT_FOUND = 'Settings not found',
  USER_NOT_FOUND = 'User not found',
  USER_WORD_NOT_FOUND = 'User`s word not found',
  STATISTICS_NOT_FOUND = 'Statistics not found',
  MISSING_TOKEN = 'Access token is missing or invalid',
  LOGIN_FAILED = 'Wrong email or password',
}

export enum ErrorMessageRU {
  FAILED = 'Адрес электронной почты уже зарегистрирован',
  LOGIN_FAILED = 'Неправильный адрес электронной почты или пароль',
  UNKNOWN = 'Что-то пошло не так, попробуйте еще раз',
  UNAUTHORIZED = 'Произошла ошибка. Необходима авторизация',
}

export enum ResponseStatus {
  MISSING_TOKEN = 401,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  FAILED = 417,
  WRONG_ENTITY = 422,
  FORBIDDEN = 403,
  OK = 200,
}

export enum UserWordType {
  DIFFICULT = 'difficult',
  LEARNED = 'learned',
}

export enum UserWordOptions {
  DIFFICULT = 'difficult',
  LEARNED = 'learned from textbook',
  SPRINT = 'sprint',
  AUDIO = 'audio',
}

export enum StatisticsOption {
  TEXTBOOK = 'textbook',
  SPRINT = 'sprint',
  AUDIO = 'audio',
}

export enum GameOptions {
  CORRECT = 'correct answer',
  WRONG = 'wrong answer',
}
