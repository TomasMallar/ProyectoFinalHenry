const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const createRole = require("./src/helpers/createRoles/createRoles.js");
const createUser = require("./src/helpers/createUser/createUser.js")



conn.sync({ after: true }).then(async () => {
  await createRole();
  await createUser();
  server.listen(3001, () => {
    console.log('%s listening at 3001');
  });
});
