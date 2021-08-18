var generateBtn = document.querySelector("#generate");

function writePassword() {
  const length = window.prompt("What length password would you like? (Enter an number between 8 and 128)");
  
  
  if (!length) {    // if no password length inserted, displays alert and recalls the function
    alert("This is required");
    writePassword();
  } else if (length < 8 || length > 128) {    // if the length is outside the range, displays and alert and recalls the function
    alert("The length must be between 8 and 128");
    writePassword();
  } else {
    const hasLower = window.confirm("Include lower case letters?");
    const hasUpper = window.confirm("Include upper case letters?");
    const hasNumber = window.confirm("Include numbers?");
    const hasSymbol = window.confirm("Include symbols?");
    
    const passwordText = document.getElementById("password");

    passwordText.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
  }
}

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  
  // Gets the number of entrys chosen
	const typesCount = lower + upper + number + symbol;
  
  // Filters the array to filter out entrys that weren't chosen
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// If no type was chosen
	if(typesCount === 0) {
		return document.getElementById("password").innerText = "Error! No entrys selected";
	}	
	
  // For loop to get a character from a random function based on the entrys chosen
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	var finalPassword = generatedPassword.slice(0, length);

  // Call to shuffle the array otherwise even though the characters chosen are random, the order is not
  finalPassword = shuffle(finalPassword);

	console.log(finalPassword);
	return finalPassword;
  
}

// Function to get random lowercase character
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Function to get random uppercase character
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Function to get random number
function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Function to get random symbol
function getRandomSymbol() {
	const symbols = '!@#$%^&*()-_=+[]{},.<>?/'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

// Shuffles the generated password randomly
function shuffle(s) {
  var arr = s.split('');
  
  arr.sort(function() {
    return 0.5 - Math.random();
  });  
  s = arr.join('');
  return s;
}