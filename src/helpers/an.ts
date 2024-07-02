// import bcrypt from "bcrypt";

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log("create user controller");
//     const payload: userType = { ...req.body };
//     const salt = await bcrypt.genSalt(10);
//     if (payload.password) {
//       payload.password = await bcrypt.hash(payload.password, salt);
//     }

//     const result = await authService.createUser(payload);
//     console.log("create user result: ", result);

//     sendResponse(res, httpStatus.OK, true, `User created Successfully`, result);
//   } catch (error: any) {
//     console.log("sign up error: ", error);
//     if (error.code === 11000 && error.keyPattern.email) {
//       console.log("duplicate error");
//       res.status(409).json({
//         success: false,
//         message: "Email Already Exists",
//         errorMessages: "Duplicate email",
//         stack: config.env !== "production" ? error?.stack : undefined,
//       });
//     } else {
//       next(error);
//     }
//   }
// };

// const login = catchAsync(async (req: Request, res: Response) => {
//   console.log("login controller");
//   const data = await authService.login(req.body);

//   sendResponse(
//     res,
//     httpStatus.OK,
//     true,
//     "User signed in successfully",
//     data.data,
//     undefined,
//     data.token
//   );
// });
// const gmailLogin = catchAsync(async (req: Request, res: Response) => {
//   const data = await authService.gmailLogin(req.body);

//   sendResponse(
//     res,
//     httpStatus.OK,
//     true,
//     "User signed in successfully",
//     undefined,
//     undefined,
//     data
//   );
// });

// export const authController = {
//   createUser,
//   login,
//   gmailLogin,
// };
