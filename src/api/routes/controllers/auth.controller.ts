import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '@services/auth.service';
import { IUserInputDTO } from '@/interfaces/IUser';
import { Logger } from 'winston';

/**
 * 
 */
export const SingUp =
    async (req: Request, res: Response, next: NextFunction) => {
        const logger: Logger = Container.get('logger');
        const authService = Container.get(AuthService);
        logger.debug('Calling Sign-Up endpoint with body: %o', req.body);

        authService.SignUp(req.body as IUserInputDTO)
            .then(({ user, token }) => res.status(201).json({ user, token }))
            .catch((err) => {
                logger.error('🔥 error: %o', err);
                return next(new Error(err.message));
            })
    };