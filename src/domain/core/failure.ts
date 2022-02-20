/*
  T represents the type of the Error
  R represents the type of the failed value passed
*/
export abstract class Failure<T, R> {
  private _errorMessage: string;

  private _type: T;
  private _failedValue: R;

  constructor(errorMessage: string, type: T, failedValue: R) {
    this._errorMessage = errorMessage;
    this._type = type;
    this._failedValue = failedValue;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  get type(): T {
    return this._type;
  }

  get failedValue(): R {
    return this._failedValue;
  }

  toString(): string {
    return `Error: (${this.errorMessage})`;
  }
}
