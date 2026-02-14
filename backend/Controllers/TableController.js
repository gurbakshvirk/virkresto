const Table = require('../Models/TableModal');



// create table
exports.createTable = async (req, res) => {
    try {
        const { tableNumber, seats, type, status } = req.body;


        const table = new Table({
            tableNumber,
            seats,
            type,
            status
        })


        await table.save();
        res.status(201).json(table);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });

    }
}


// get all tables 
exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.json(tables);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// get single table 
exports.getTablebyID = async (req, res) => {
    try {
        const tables = await Table.findById(req.params.id);
        if (!tables) {
            return res.status(404).json({ message: "Table not found" });
        }

        res.json(tables)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// update table 
exports.updateTable = async (req, res) => {

    try {
        const { tableNumber, seats, type, status } = req.body;
        const UpdateTabledata = {
            tableNumber,
            seats,
            type,
            status
        }


        const table = await Table.findByIdAndUpdate(
            req.params.id,
            UpdateTabledata,
            { new: true, runValidators: true }
        )
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        res.json(table)
    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
};


// delete table
exports.deleteTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.json({ message: "Table deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: error.message });
  }
};