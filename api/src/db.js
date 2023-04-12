require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    //Agregué como variable de entorno el name de la db
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Product, User, Category } = sequelize.models;

Product.belongsToMany(Category, {
  through: { model: "ProductsCategory" },
  timestamps: false,
});
Category.belongsToMany(Product, {
  through: { model: "ProductsCategory" },
  timestamps: false,
});

//Relación entre los productos y los usuarios | Habría que modificar aquí así se hace con Favoritos como dicen
User.belongsToMany(Product, {
  through: { model: "UsersProducts" },
  timestamps: false,
});
Product.belongsToMany(User, {
  through: { model: "UsersProducts" },
  timestamps: false,
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
