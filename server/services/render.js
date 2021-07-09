const axios = require("axios");

exports.homeRoutes = (req, res) => {
  axios
    .get(`http://localhost:3000/api/users`)
    .then(function (response) {
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// exports.homeRoutes = (req, res) => {
//   axios
//     .post(`http://localhost:3000/api/users`)
//     .then(function (response) {
//       res.render("index", { users: response.data });
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// };
