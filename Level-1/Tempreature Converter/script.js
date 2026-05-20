
function convertTemp(){

  const degree =
    parseFloat(
      document.getElementById("degree").value
    );

  const from =
    document.getElementById("fromUnit").value;

  const to =
    document.getElementById("toUnit").value;

  const result =
    document.getElementById("result");

  const unit =
    document.getElementById("unit");

  if(isNaN(degree)){
    result.innerHTML = "--";
    unit.innerHTML = "";
    return;
  }

  let celsius;

  // Convert to Celsius first

  if(from === "C"){
    celsius = degree;
  }

  else if(from === "F"){
    celsius = (degree - 32) * 5/9;
  }

  else{
    celsius = degree - 273.15;
  }

  let finalValue;

  // Convert Celsius to target

  if(to === "C"){
    finalValue = celsius;
  }

  else if(to === "F"){
    finalValue = (celsius * 9/5) + 32;
  }

  else{
    finalValue = celsius + 273.15;
  }

  result.innerHTML =
    parseFloat(finalValue.toFixed(2));

  unit.innerHTML =
    to === "K" ? "K" : `°${to}`;
}

convertTemp();
