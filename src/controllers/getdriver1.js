const { Driver } = require("../db");

//Función que se utiliza por única vez para poblar la BD
const getDriver1 = async (req, res) => {    
    try {            
            const peopleBD = await Driver.bulkCreate(driversApi);
        res
        .status(200)
        .json(peopleBD);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = getDriver1;