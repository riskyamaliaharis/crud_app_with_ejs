var Userdb = require("../model/user_model");

exports.createNewUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content couldn't be empty" });
    return;
  }

  if (!req.file) {
    const err = new Error(req.file);

    err.errorStatus = 400;

    throw err;
  }

  const user = new Userdb({
    name: req.body.name,
    phone: req.body.phone,
    date: req.body.date,
    address: req.body.address,
    card: req.file.path,
    current_position: req.body.current_position,
  });

  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating create operation",
      });
    });
};

exports.showUsers = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "User not found" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving user",
        });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while trying to retrive users data",
        });
      });
  }
};

exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data couldn't be empty" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Failed to update, maybe user is not listed` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Failed to delete` });
      } else {
        res.send({ message: `User data was deleted successfully` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error delete user" });
    });
};
