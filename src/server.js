/* eslint-disable no-console */
const { app } = require("./config");
const { sequelize } = require("./services/database");

const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to db been established successfully.");
    // eslint-disable-next-line no-return-await
    (async () => await sequelize.sync({ alter: true }))();
    app.listen(port, () => console.log(`API listening on port ${port}!`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
