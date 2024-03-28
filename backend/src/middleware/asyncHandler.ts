import { Request, Response, NextFunction } from 'express';

export const asyncHandler = <T extends Request>(func: (req: T, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: T, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};
