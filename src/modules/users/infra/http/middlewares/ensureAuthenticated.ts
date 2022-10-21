import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import auth from '@config/auth';

import AppError from '@shared/errors/AppError';

function ensureAuthenticated(
  next: NextFunction, req: Request, _res: Response,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing.', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as JwtPayload;

    req.user = {
      id: sub as string,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token.', 401);
  }
}

export default ensureAuthenticated;
