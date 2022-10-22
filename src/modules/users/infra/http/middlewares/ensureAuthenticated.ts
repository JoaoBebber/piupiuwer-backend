import { NextFunction, Request, Response } from 'express';
import { JwtPayload, Secret, verify } from 'jsonwebtoken';

import auth from '@config/auth';

import AppError from '@shared/errors/AppError';

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing.', 401);

  const [word, token] = authHeader.split(' ');

  if (word !== 'Bearer') throw new AppError('Wrong authentication word.', 401);

  try {
    const decoded = verify(token, auth.jwt.secret as Secret);

    const { sub } = decoded as JwtPayload;

    request.user = { id: sub as string };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token.', 401);
  }
}

export default ensureAuthenticated;
