const express = require("express");
const router = express.Router();
const tablecontroller = require('../Controllers/TableController');


//create table route
router.post("/", tablecontroller.createTable);


// update table route 
router.put("/:id", tablecontroller.updateTable);

// get tables routes
router.get("/", tablecontroller.getAllTables);
router.get("/:id", tablecontroller.getTablebyID)

// deletetable route 
router.delete("/:id", tablecontroller.deleteTable)


module.exports = router;
