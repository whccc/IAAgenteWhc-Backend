import { IUser } from './interfaces/IUser';

export class User implements IUser {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public age: number,
  ) {}
}
