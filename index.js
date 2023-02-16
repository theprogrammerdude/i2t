var fs = require("fs");
var Tesseract = require("tesseract.js");

function phonenumber(inputtxt) {
  var phoneno = /^\d{10}$/;
  if (inputtxt.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}

for (let i = 1; i <= 79; i++) {
  Tesseract.recognize(`./imgs/${i}.jpeg`, "eng", {
    logger: (m) => console.log(m),
  }).then(async ({ data: { text } }) => {
    text.split("+91 ").forEach((element) => {
      var num = (element + "\n").substring(0, 11).trim().split(" ").join("");

      if (phonenumber(num)) {
        fs.appendFileSync("numbers.txt", num + "\n", "UTF-8", { flags: "a+" });
      }
    });
  });
}
