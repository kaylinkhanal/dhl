const multer = require("multer");

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Client/src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const avatarUpload = multer({ storage: avatarStorage }).single("avatar");


const orderStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Client/src/uploads/orders')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const orderUpload = multer({ storage: orderStorage }).single('orders')

exports.avatarUpload = avatarUpload;
exports.orderUpload = orderUpload;
