const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB Online");
  } catch (error) {
    console.log("Error");
    throw new Error("Error al Inicializar DB");
  }
};
module.exports = {
  dbConnection,
};
