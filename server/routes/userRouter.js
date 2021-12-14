const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

// REGISTRAR USUARIO
router.post("/register", userCtrl.registerUser);

// LOGIN USUARIO
router.post("/login", userCtrl.loginUser);

// VERIFICAR TOKEN
/* router.get("/verify", auth, (req, res) => {
  res.json(req.user.id);
  console.log(req.user);
}); */
router.get("/verify", userCtrl.verifiedToken);

module.exports = router;
