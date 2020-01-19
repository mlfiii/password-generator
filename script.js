//Code adapted from https://codepen.io/FlorinPop17/pen/BaBePej
//Declare all objects
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");
const resultAreaEl = document.getElementById("result-area");
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

//Set the focus on the generate button so the enter key can be used to start the generate password.
document.getElementById("generate").focus();

// Setup the listener for the clipboard
clipboard.addEventListener("click", () => {
  //Setup the objects
  const textarea = document.createElement("textarea");
  const password = resultAreaEl.innerText;

  //If the password is blank, exit the function because the password has not been set yet.  Alert the user.
  if (!password) {
    alert("You must generate a password first!");
    return;
  }

  if (password === "Your Secure Password") {
    alert("You must generate a password first!");
    return;
  }
  //Create a text area that holds the password to be copied to clipboard
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  resultAreaEl.style.backgroundColor = "lightgrey";
  textarea.remove();
  // resultAreaEl.style.backgroundColor = "lightgreen";
  //Alert user that the password has been copied to clipboard.
  alert("Your new password has been copied to clipboard!");
});

//Function that prompts for the desired length.
function promptLength() {
  //reset to white in case the had previously copied to clipboard.
  resultAreaEl.style.backgroundColor = "white";

  const strLength = prompt(
    "Please enter the password length greater than 7!",
    "8"
  );
  return strLength;
}

//Function that prompts if the special characters are desired in password.
function confirmSymbol() {
  const strSymbol = confirm("Include special symbols '!@#$%^&*(){}=<>/,.'?");
  return strSymbol;
}
//Function that prompts if numbers are desired in password.
function confirmNumber() {
  const strNumber = confirm("Include Numbers?");
  return strNumber;
}

//Function that prompts if lowercase is desired in password.
function confirmLower() {
  const strLower = confirm("Include Lower Case letters?");
  return strLower;
}

//Function that prompts if uppercase is desired in password.

function confirmUpper() {
  const strLower = confirm("Include Upper Case letters?");
  return strLower;
}

//Generatrates password when button is clicked
generate.addEventListener("click", () => {
  //Make sure that the password length is less than or equal to 128.
  const strLength = parseInt(promptLength());
  var strContinue = "";
  //Exit if either the legnth is not greater than 7 or is less than 129

  if (strLength) {
    strContinue = "";
  } else {
    alert("You have cancelled the Password Generator!");
    resultAreaEl.innerText = "Your Secure Password";
    resultAreaEl.style.color = "black";
    return;
  }
  if (strLength < 8) {
    alert("Please choose a password length greater than 7!");
    return;
  }

  if (strLength > 128) {
    alert("Please choose a password length less than 129!");
    return;
  }
  //Run the functions that collect the other responses.
  const strSymbol = confirmSymbol();
  const strNumber = confirmNumber();
  const strLower = confirmLower();
  const strUpper = confirmUpper();

  //If all of the confirm prompts were cancelled, then alert user that they must select at least one ok and cancel function.
  if (
    strSymbol === false &&
    strNumber === false &&
    strLower === false &&
    strUpper === false
  ) {
    alert(
      "You must choose 'OK' at least once to the Symbol, Number, Upper or Lower prompts."
    );
    return;
  }
  //Set the resultAreaEL to the password function result.
  resultAreaEl.style.color = "darkgreen";
  resultAreaEl.innerText = generatePassword(
    strLower,
    strUpper,
    strNumber,
    strSymbol,
    strLength
  );
  // console.log(resultEl.innerText.length);
});

//The gererate password function.

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );

  // Doesn't have a selected type
  if (typesCount === 0) {
    return "";
  }

  // Loops through the length input by user.
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  //Cuts the password down to the actual size of the password length instead of the number of times looped.
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

//Creates the random lowercase string
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//Creates the random uppercase string.

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//Creates the random number string.
function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//Creates the random symbols string.
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
