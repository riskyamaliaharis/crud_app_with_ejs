const express = require("express");
const route = express.Router();
const services = require("../services/render");
const controller = require("../controller/user_controller");

// app.get("/", (req, res) => {
//   res.render(`index`);
// });

route.get("/", services.homeRoutes);

/**
 * @description Root Route
 * @method GET/
 */

// API
route.post("/api/users", controller.createNewUser);
route.get("/api/users", controller.showUsers);
route.patch("/api/users/:id", controller.updateUser);
route.delete("/api/users/:id", controller.deleteUser);

module.exports = route;
