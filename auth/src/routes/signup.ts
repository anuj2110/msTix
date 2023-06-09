import express, { Response, Request } from "express";
import { body, validationResult } from "express-validator";
import RequestValidationError from "../errors/request-validation-error";
import DatabaseConnectionError from "../errors/database-connection-error";
import { User } from "../models/user";
import BadRequestError from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail(),
    body("password").trim().isLength({ min: 6, max: 20 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new BadRequestError("Email already in use");
    }

    const user = await User.build({ email, password });
    await user.save();
    return res.status(201).send(user);
  }
);

export { router as signupRouter };
