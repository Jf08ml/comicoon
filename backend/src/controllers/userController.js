import jwt from "jsonwebtoken";
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
import User from "../models/users";

async function signup(req, res) {
  try {
    const { nickname, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email: email }, { nickname: nickname }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ result: "errorEmail", message: "Email already exists" });
      }
      if (existingUser.nickname === nickname) {
        return res.status(400).json({
          result: "errorNickname",
          message: "Nickname already exists",
        });
      }
    }

    const user = new User({ nickname, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ result: "success", token, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "error", message: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { identifier, password } = req.body;

    // Buscar al usuario por email o nickname
    const user = await User.findOne({
      $or: [{ email: identifier }, { nickname: identifier }],
    });

    // Si el usuario no existe
    if (!user) {
      return res.status(401).json({
        result: "errorNotFound",
        message: "User not found. Please check your email address or nickname.",
      });
    }

    // Verificar la contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        result: "errorPassword",
        message: "Invalid password. Please check your password.",
      });
    }

    // Generar tokens
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
      expiresIn: "24h",
    });

    const tokenDuration = 3600; // duración del token en segundos (1 hora)
    const refreshTokenDuration = 86400; // duración del refresh token en segundos (24 horas)
    const now = new Date();
    const tokenExpiration = new Date(now.getTime() + tokenDuration * 1000);
    const refreshTokenExpiration = new Date(
      now.getTime() + refreshTokenDuration * 1000
    );

    // Enviar respuesta
    res.status(200).json({
      result: "success",
      token: token,
      refreshToken: refreshToken,
      issuedAt: now,
      tokenExpire: tokenExpiration,
      refreshTokenExpire: refreshTokenExpiration,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      result: "error",
      message: "Internal server error. Please try again later.",
    });
  }
}

async function refreshTokens(req, res) {
  try {
    const { refreshTokenUser } = req.body;
    jwt.verify(refreshTokenUser, JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ error: "RefreshTokenError", message: err.name });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
      const newRefreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
        expiresIn: "24h",
      });

      res
        .status(200)
        .json({ result: "success", token, refreshToken: newRefreshToken });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function searchNickname(req, res) {
  const { nickname } = req.params;
  try {
    const existingNick = await User.findOne({
      nickname: { $regex: new RegExp("^" + nickname.toLowerCase() + "$", "i") },
    });
    if (existingNick) {
      return res
        .status(200)
        .json({ value: true, message: "Nickname already exists" });
    }
    return res
      .status(200)
      .json({ value: false, message: "Nickname available" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error searching nickname" });
  }
}

async function getUser(req, res) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
}

async function updateUser(req, res) {
  const { name, lastName, country, city, nickname, email } = req.body;
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(401)
        .json({ result: "errorUser", message: "Unauthorized updateUser" });
    }

    user.name = name;
    user.lastName = lastName;
    user.country = country;
    user.city = city;
    user.nickname = nickname;
    user.email = email;

    await user.save();
    res.status(200).json({
      result: "success",
      message: "User information updated successfully",
    });
  } catch (err) {
    res.status(500).json({ result: "error", message: err });
  }
}

async function updatePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(401)
        .json({ result: "error", message: "Unauthorized updateUser" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        result: "errorpassword",
        message: "Invalid password. Please check your password.",
      });
    }

    user.password = newPassword;

    await user.save();
    res
      .status(200)
      .json({ result: "success", message: "Password update success" });
  } catch (err) {
    res.status(500).json({ result: "error", message: err });
  }
}

async function updateProfilePhoto(req, res) {
  const { userPhotoUrl } = req.body;
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized updateUser" });
    }

    user.userUrlPhoto = userPhotoUrl;

    await user.save();
    res
      .status(200)
      .json({ result: "success", message: "Photo update success" });
  } catch (err) {
    res.status(500).json({ message: "servidor error" });
  }
}

export {
  signup,
  login,
  refreshTokens,
  searchNickname,
  updateUser,
  updateProfilePhoto,
  getUser,
  updatePassword,
};
