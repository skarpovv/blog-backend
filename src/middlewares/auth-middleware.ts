import { Response, NextFunction } from 'express';
import { Secret, verify, VerifyErrors } from 'jsonwebtoken';

export default function (req: any, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    // Allow preflight requests to pass
    next();
  }

  if (req.path === '/auth/login' || req.path === '/auth/register') {
    next();
    return;
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    verify(
      token,
      process.env.SECRET_KEY as Secret,
      (error: VerifyErrors | null, decodedData: any) => {
        if (error) {
          console.log(error);
          return res.status(403).json({ message: 'Not authorized' });
        }

        req.user = decodedData;
        next();
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'Not authorized' });
  }
}
