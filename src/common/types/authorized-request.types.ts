import { User } from 'src/users/entities';
import { Request } from 'express';

export interface AuthorizedRequest extends Request<any, any, any> {
  user: User;
}
