const { Rol } = require("../../db");

const createRole = async () => {
  await Rol.findOrCreate({
    where: { rol_name: process.env.ROLE_A },
    defaults: { rol_name: process.env.ROLE_A }
  });
  
  await Rol.findOrCreate({
    where: { rol_name: process.env.ROLE_B },
    defaults: { rol_name: process.env.ROLE_B }
  });
}

module.exports = createRole;