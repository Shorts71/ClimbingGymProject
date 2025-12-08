const { Router } = require("express");
// Middlewares
const createUserRules = require("./middlewares/create-users-rules");
const updateUserRules = require("./middlewares/update-users-rules");
const authorize = require("../../shared/middlewares/authorize");
const registerRules = require("./middlewares/register-rules");
const loginRules = require("./middlewares/login-rules");
const verifyLoginRules = require("./middlewares/verify-login-rules");
// Model
const UserModel = require("./users-model");
const usersRoute = Router();
// Tokens/Password
const { matchPassword } = require("../../shared/password-utils");
const { encodeToken } = require("../../shared/jwt-utils");
const { decodeToken } = require("../../shared/jwt-utils");
// OTP/EMail
const { randomNumberOfDigits } = require("../../shared/compute-utils");
const OTPModel = require("../otp-model");
const sendEmail = require("../../shared/email-utils");

// Get all users (for admin only)

usersRoute.get("/users", authorize(["admin"]), async (req, res) => {
  const currentUser = req.account;

  if (!currentUser.roles.includes("admin")) {
    return res.status(403).send({
      errorMessage: "User does not have valid authentication",
      currentRoles: currentUser.roles,
    });
  }

  const allUsers = await UserModel.find().select("-password");
  if (!allUsers) {
    res.json([]);
  } else {
    console.log("All users found.");
    res.status(200).json(allUsers);
  }
});

/*
 * Get user by id
 * Admin can access all users by id
 * All other roles can only access their own account
 */

usersRoute.get(
  "/users/:id",
  authorize(["admin", "staff"]),
  async (req, res) => {
    const currentUser = req.account;
    const userID = req.params.id;
    const isAdmin = req.account.roles.includes("admin");

    if (!isAdmin) {
      return res.status(201).send({
        errorMessage: "You do not have access to this account.",
        currentRoles: currentUser.roles,
      });
    }
    const foundUser = await UserModel.findById(userID);
    if (!foundUser) {
      return res.status(404).send(`User with ID ${userID} does not exist.`);
    } else {
      console.log("User found.");
      res.status(200).json(foundUser);
    }
  }
);

// Account creation route, only admin can access

usersRoute.post(
  "/users",
  createUserRules,
  authorize(["admin"]),
  async (req, res) => {
    const currentUser = req.account;
    const newUser = req.body;
    const isAdmin = req.account.roles.includes("admin");

    if (!isAdmin) {
      return res.status(201).send({
        errorMessage: "You do not have permission to create accounts.",
        currentRoles: currentUser.roles,
      });
    }
    const addedUser = await UserModel.create({
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      password: newUser.password,
      address: newUser.address,
      roles: newUser.roles,
    });
    if (!addedUser) {
      return res.status(500).send(`Oops! User couldn't be added!`);
    }
    console.log("User added.");
    res.status(201).json(addedUser);
  }
);

/*
 * Update user by id
 * Admin can access all users by id
 * All other roles can only access their own account
 */

usersRoute.put(
  "/users/:id",
  updateUserRules,
  authorize(["admin", "customer", "seller", "staff"]),
  async (req, res) => {
    const currentUser = req.account;
    const userID = req.params.id;

    const isAdmin = req.account.roles.includes("admin");
    if (!isAdmin && newUser.roles) {
      return res.status(401).json({
        errorMessage: "You don't have permission to update your role.",
        roles: currentUser.roles,
      });
    }

    const foundUser = await UserModel.findById(userID);
    if (!foundUser) {
      return res.status(404).send(`User with ID ${userID} does not exist.`);
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      {
        $set: {
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          password: foundUser.password,
          address: foundUser.address,
        },
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(500).send(`Oops! User couldn't be updated!`);
    }
    console.log("User updated.");
    res.status(200).json(updatedUser);
  }
);

// Delete account, only accessible by admin

usersRoute.delete("/users/:id", authorize(["admin"]), async (req, res) => {
  const currentUser = req.account;
  const userID = req.params.id;

  const isAdmin = req.account.roles.includes("admin");
  if (!isAdmin) {
    return res.status(201).send({
      errorMessage: "You do not have permission to create accounts.",
      currentRoles: currentUser.roles,
    });
  }

  const foundUser = await UserModel.findById(userID);
  if (!foundUser) {
    return res.status(404).send(`User with ID ${userID} does not exist.`);
  }
  const deletedUser = await UserModel.findByIdAndDelete(userID).select(
    "-password"
  );
  if (!deletedUser) {
    return res.status(500).send("Oops! User could not be deleted!");
  }
  console.log("User deleted.");
  res.status(200).json(deletedUser);
});

// Register

usersRoute.post("/users/register", registerRules, async (req, res) => {
  const newUser = req.body;
  const existingUser = await UserModel.findOne({
    email: newUser.email,
  });
  if (existingUser) {
    return res.status(500).json({
      errorMessage: `User with ${newUser.email} already exist`,
    });
  }

  const addedUser = await UserModel.create(newUser);
  if (!addedUser) {
    return res.status(500).send({
      errorMessage: `Oops! User couldn't be added!`,
    });
  }
  const user = { ...addedUser.toJSON(), password: undefined };

  if (user.role) {
    user.roles = [user.role];
    delete user.role;
  }

  res.json(user);
});

// Login

usersRoute.post("/users/login", loginRules, async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    return res.status(404).send({
      errorMessage: `User with ${email} doesn't exist`,
    });
  }
  const passwordMatched = matchPassword(password, foundUser.password);
  if (!passwordMatched) {
    return res.status(401).send({
      errorMessage: `Email and password didn't matched`,
    });
  }
  const code = randomNumberOfDigits(6);
  let userOTP = await OTPModel.findOne({ email: email });
  if (!userOTP) {
    userOTP = await OTPModel.create({
      email: email,
      otp: code,
    });
  } else {
    userOTP.otp = code;
    userOTP.save();
  }
  await sendEmail(
    email,
    "Verification",
    `Here's your OTP to verify your login: ${code}`
  );
  res.send({ message: "OTP is sent via email" });
});

// Verify Login with OTP

usersRoute.post("/users/verify-login", verifyLoginRules, async (req, res) => {
  const { email, otp } = req.body;
  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    return res.status(404).send({
      errorMessage: `User with ${email} doesn't exist`,
    });
  }
  if (!otp) {
    res.status(201).json("Verification failed");
  } else {
    const user = { ...foundUser.toJSON(), password: undefined };
    if (user.role) {
      user.roles = [user.role];
      delete user.role;
    }
    const token = encodeToken(user);
    res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.json({ user });
  }
});

usersRoute.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Not logged in" });

    const decoded = decodeToken(token);
    if (!decoded) return res.status(401).json({ errorMessage: "Invalid token" });

    res.json({ user: decoded });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Server error" });
  }
});

module.exports = { usersRoute };
