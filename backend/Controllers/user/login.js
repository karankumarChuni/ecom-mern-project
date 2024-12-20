const jwt = require("jsonwebtoken");
const usertable = require("../../Models/usertable.js");
const bcrypt = require("bcryptjs");
const secretKey = process.env.JWT_SECRET;

const login = async (req, res) => {
  console.log("hello login routes")
  try {
    const { email, password, isAdminLogin } = req.body;
    const user = await usertable.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Password not match" });
    }

    if (isAdminLogin) {
      // Restrict admin panel access to active admins only
      if (user.isAdmin !== "Active") {
        return res.status(403).send({
          message: "Access denied: Only active admin users can log in.",
        });
      }
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, secretKey, {
      expiresIn: "100h",
    });

    res.status(200).send({
      status: "successfull",
      message: "Login successful",
      token: token,
      user: { id: user._id, isAdmin: user.isAdmin },
    });
  } catch (errors) {
    res.status(500).send({ status: "failed", errors: errors.errors });
  }
};

module.exports = login;
