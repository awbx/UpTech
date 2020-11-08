const jwt = require("jsonwebtoken");
const { jwtSecrets } = require("../config/config");

// this function will generate an access token based on the username param and access token secret key
const signAccessToken = async (username, rememberMe) => {
  try {
    let accessToken = await jwt.sign(
      { username },
      jwtSecrets.accessTokenSecretKey,
      {
        expiresIn: rememberMe ? "144h" : "24h",
      }
    );
    return accessToken;
  } catch (err) {
    console.error(err);
  }
};
const verifyAccessToken = async (accessToken) => {
  try {
    let payload = await jwt.verify(
      accessToken,
      jwtSecrets.accessTokenSecretKey
    );
    return payload;
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      err.isJWT = true;
    }
    throw err;
  }
};

const signConfirmationToken = async (email) => {
  try {
    let token = await jwt.sign({ email }, jwtSecrets.confirmationSerectKey, {
      expiresIn: "24h",
    });
    return token;
  } catch (err) {
    throw err;
  }
};
const verifyConfirmationToken = async (token) => {
  try {
    let payload = await jwt.verify(token, jwtSecrets.confirmationSerectKey);
    return payload["email"];
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      err.isJWT = true;
    }
    throw err;
  }
};

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signConfirmationToken,
  verifyConfirmationToken,
};
