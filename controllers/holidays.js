const express = require("express");
const holidays = express.Router();

const Holiday = require("../models/holidayModel");

//To read/retrieve records
holidays.get("/", (req, res) => {
  Holiday.find({}, (err, myHolidays) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json(myHolidays);
    }
  });
});

//To create/insert holiday
holidays.post("/", (req, res) => {
  Holiday.create(req.body, (err, createdHoliday) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.send(createdHoliday);
    }
  });
});

//To delete holiday
holidays.delete("/:id", (req, res) => {
  Holiday.findByIdAndDelete(req.params.id, (err, deletedHoliday) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.send(deletedHoliday);
    }
  });
});

//To update holiday
holidays.put("/:id", (req, res) => {
  Holiday.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedHoliday) => {
      if (err) {
        res.status(400).json({ err: err.message });
      } else {
        res.status(200).json(updatedHoliday);
      }
    }
  );
});

module.exports = holidays;
