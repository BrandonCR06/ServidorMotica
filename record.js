const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("./database");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 


 


// This section will help you get a list of all the records.
recordRoutes.get('/',(req,res) =>{
    res.send("Hello");
})
recordRoutes.get('/get/users', (req, res) =>{
  dbo.connection.useDb('MoticaDB').collection("Users").find({})
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
  
});

recordRoutes.get('/records', (req, res) =>{
    dbo.connection.useDb('MoticaDB').collection("Personas").find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
    
});



// This section will help you get a list of all the products.
recordRoutes.get('/products', (req, res) =>{
  dbo.connection.useDb('MoticaDB').collection("Products").find({})
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
  
});


recordRoutes.post('/add/user', (req, res) =>{
    let myobj = {
        nombre: req.body.nombre,        
        apellido: req.body.apellido,
        fecha_nacimiento: req.body.fecha_nacimiento,
        correo: req.body.correo,
        contrasenha : req.body.contrasenha,
        cedula : req.body.cedula,
        sexo : req.body.sexo,
        rol : req.body.rol
      };
      console.log(req.body);
    dbo.connection.useDb('MoticaDB').collection("Users").insertOne(myobj, function (err, result) {
        if (err) console.log (err);
        res.json(result);
      });
});
 



module.exports = recordRoutes;
