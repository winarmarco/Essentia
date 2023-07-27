const formatCardNumber = (inputtedValue: string): string => {
  let formattedValue = "";
  let digit = 0;

  for (let i = 0; i < inputtedValue.length; i++) {
    if (inputtedValue[i] === ' ') continue;
    // if not a digit then skip
    if (! /[0-9]/.test(inputtedValue[i])) continue;

    formattedValue += inputtedValue[i];
    digit += 1;
    if ((digit) % 4 === 0 && i < inputtedValue.length - 1) formattedValue += " ";
  }
  return formattedValue;
};

const formatExpiryDate = (inputtedValue: string): string => {
  let formattedValue = "";
  let digit = 0;

  for (let i = 0; i < inputtedValue.length; i++) {
    if (inputtedValue[i] === '/') continue;
    // if not a digit then skip
    if (!/[0-9]/.test(inputtedValue[i])) continue;

    formattedValue += inputtedValue[i];
    digit += 1;
    if ((digit) % 2 === 0 && i < inputtedValue.length - 1) formattedValue += "/";
  }
  return formattedValue;
};

const formatCsc = (inputtedValue: string): string => {
  let formattedValue = "";

  for (let i = 0;i < inputtedValue.length;i++) {
    // if not a digit then skip
    if (!/[0-9]/.test(inputtedValue[i])) continue;

    formattedValue += inputtedValue[i];
  }

  return formattedValue;
}


export {formatCardNumber, formatExpiryDate, formatCsc};