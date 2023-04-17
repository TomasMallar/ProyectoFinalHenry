const { Type } = require("../../db");

const postTypeController = async (name) => {
  
 
     await Type.findOrCreate({
      where: { name },
    });
  

  };

module.exports = { postTypeController}