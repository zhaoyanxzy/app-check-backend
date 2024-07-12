import { getAppCheck } from "firebase-admin/app-check";
import { Request, Response, NextFunction } from "express";

export const appCheckVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const appCheckToken = req.header("X-Firebase-AppCheck");

  if (!appCheckToken) {
    res.status(401);
    return next("Unauthorized");
  }

  try {
    const appCheckClaims = await getAppCheck().verifyToken(appCheckToken);

    // If verifyToken() succeeds, continue with the next middleware
    // function in the stack.
    return next();
  } catch (err) {
    res.status(401);
    return next("Unauthorized");
  }
};
