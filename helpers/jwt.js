const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo Generar el Token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWT,
};
