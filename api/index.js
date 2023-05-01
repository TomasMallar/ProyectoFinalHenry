const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const createRole = require("./src/helpers/createRoles/createRoles.js");
const createUser = require("./src/helpers/createUser/createUser.js")
const {PORT} = process.env || 3001
conn.sync({ after: true }).then(async () => {
  await createRole();
  await createUser();
  server.listen(PORT, () => {
    console.log('%s listening at 3001');
  });
});
