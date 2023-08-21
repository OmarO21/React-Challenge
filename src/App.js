// Import necessary components and styles
import React, { useState } from 'react';
import './App.css';

// Function to generate Fibonacci sequence with custom parameters
function generateFibonacci(x, y, z) {
  const sequence = [1, 1];
  for (let i = 2; i < x; i++) {
  //checking if sequence[i - y]/[i - z] is undefined or not. If it is undefined, then we take 0 as the value for firstTerm/secondTerm. 
  //Otherwise, we take the value stored at index i - y/i - z in the sequence array.
    let firstTerm = sequence[i - y] !== undefined ? sequence[i - y] : 0;
    let secondTerm = sequence[i - z] !== undefined ? sequence[i - z] : 0;

    sequence.push(firstTerm + secondTerm);
  }
  return sequence;
}

// Define the main App component
function App() {
  // State variables to track user input and output
  // State variables for FizzBuzz divisors and their corresponding words
  const [divisor1, setDivisor1] = useState(3); // Sets the default output to 3
  const [divisor2, setDivisor2] = useState(5); // Sets the default output to 5
  const [divisor1word, setDivisor1Word] = useState("Fizz"); // Sets the default output to Fizz
  const [divisor2word, setDivisor2Word] = useState("Buzz"); // Sets the default output to Buzz
  // State variables for Fibonacci sequence customization
  const [x, setx] = useState(0); // For user input x
  const [y, sety] = useState(1); // For user input y
  const [z, setz] = useState(2); // For user input z
  // State variables for counting occurrences of Fizz, Buzz, FizzBuzz
  const [FizzCount, setFizzCount] = useState(0); // Correct way to initialize state variables
  const [BuzzCount, setBuzzCount] = useState(0);
  const [FizzBuzzCount, setFizzBuzzCount] = useState(0);
  // State variable for storing the output
  const [output, setOutput] = useState('');

  // These will be used for errors
  const [xError, setXError] = useState("");
  const [yError, setYError] = useState("");
  const [zError, setZError] = useState("");
  const [divisor1Error, setDivisor1Error] = useState("");
  const [divisor2Error, setDivisor2Error] = useState("");

  // function which Resets back to default variables
  const resetValues = () => {
    setDivisor1(3);
    setDivisor2(5);
    setDivisor1Word("Fizz");
    setDivisor2Word("Buzz");
    setx(0);
    sety(1);
    setz(2);
    setOutput('');
};


  // Event handlers for the user inputs
  const handleDivisor1Change = (event) => {
    const inputValue = event.target.value.trim();
    setDivisor1(parseInt(inputValue));
  };
  
  const handleDivisor2Change = (event) => {
    const inputValue = event.target.value.trim();
    setDivisor2(parseInt(inputValue));
  };

  const handleDivisor1WordChange = (event) => {
    setDivisor1Word(event.target.value);
  };

  const handleDivisor2WordChange = (event) => {
    setDivisor2Word(event.target.value);
  };

  const handleXChange = (event) => {
    const inputValue = event.target.value.trim();
    setx(parseInt(inputValue));
  };
  
  const handleYChange = (event) => {
    const inputValue = event.target.value.trim();
    sety(parseInt(inputValue));
  };
  
  const handleZChange = (event) => {
    const inputValue = event.target.value.trim();
    setz(parseInt(inputValue));
  };

  //Function used to validate the user input
  const validateInput = () => {
    let isValid = true;
  
    // Validate x
    if (x <= 0) {
      setXError("The input for x must be greater than 0");
      isValid = false;
    } 
    else if (x <= y || x <= z) {
      setXError("X must be greater than both Y and Z");
      isValid = false;
    } 
    else {
      setXError("");
    }
  
    // Validate y
    if (y <= 0) {
      setYError("The input for y must be greater than 0");
      isValid = false;
    } 
    else if (y >= x) {
      setYError("Y must be smaller than X");
      isValid = false;
    } 
    else if (y >= z){
      setYError("Y must be smaller than Z");
      isValid = false;
    }
    else {
      setYError("");
    }
  
    // Validate z
    if (z <= 0) {
      setZError("The input for z must be greater than 0");
      isValid = false;
    } 
    else if (z >= x) {
      setZError("Z must be smaller than X");
      isValid = false;
    } 
    else if (z <= y){
      setYError("Z must be bigger than Y");
      isValid = false;
    }
    else {
      setZError("");
    }
  
    // Validate divisor1
    if (divisor1 <= 0) {
      setDivisor1Error("The divisor1 must be greater than 0");
      isValid = false;
    } 
    else {
      setDivisor1Error("");
    }
  
    // Validate divisor2
    if (divisor2 <= 0) {
      setDivisor2Error("The divisor2 must be greater than 0");
      isValid = false;
    } 
    else {
      setDivisor2Error("");
    }
  
    return isValid;
  };
  
  // Function to generate the "FizzBuzz" output
  const generateOutput = () => {
    try {
      // Clear previous errors first
      setXError("");
      setYError("");
      setZError("");
      setDivisor1Error("");
      setDivisor2Error("");
      
      // Validate input before generating output
      if (!validateInput()) {
        throw new Error("Validation failed");
      }
  
      const FibonacciSequence = generateFibonacci(x, y, z);
      // Initialize an empty array to hold JSX elements for the output
      const result = [];
      // Initialize counters for Fizz, Buzz, and FizzBuzz occurrence
      let LocalFizzBuzzCount = 0;
      let LocalFizzCount = 0;
      let LocalBuzzCount = 0;
      
      // Loop through the generated Fibonacci sequence
      for (let i = 0; i < x; i++) {
        const currentNumber = FibonacciSequence[i];
        let element;
        
        if (currentNumber % divisor1 === 0 && currentNumber % divisor2 === 0) {
          element = <span key={i} className="FizzBuzz">{divisor1word}{divisor2word}</span>;  // Create a JSX span element with the word for divisor1 and a unique key
          LocalFizzBuzzCount+=1;
        } 
        else if (currentNumber % divisor1 === 0) {
          element = <span key={i} className="Fizz">{divisor1word}</span>;
          LocalFizzCount+=1;
        } 
        else if (currentNumber % divisor2 === 0) {
          element = <span key={i} className="Buzz">{divisor2word}</span>;
          LocalBuzzCount+=1;
        } 
        else {
          element = <span key={i}>{currentNumber}</span>;
        }
         // Push the JSX element and a space into the array
        result.push(element, ' ');
      }
      // Update the output and counter state with the array of JSX elements and the counters from the local variables
      setOutput(result);
      setFizzBuzzCount(LocalFizzBuzzCount);
      setFizzCount(LocalFizzCount);
      setBuzzCount(LocalBuzzCount);
    } 
    catch (error) {
      console.log(error.message);
    }
  };
  

// Render the user interface
return (
  <div className="App">
    <h1>Code Challenge Application</h1>
    {/* Input fields for user */}
    <label>Enter x for the Fibonacci Sequence: <input type="number" onChange={handleXChange} value={x} placeholder="value" /></label><div className={xError ? "error" : ""}>{xError}</div>
    <label>Enter y : <input type = "number" onChange = {handleYChange} value = {y} placeholder = "value" /></label><div className={yError ? "error" : ""}>{yError}</div>
    <label>Enter z : <input type = "number" onChange = {handleZChange} value = {z} placeholder = "value" /></label><div className={zError ? "error" : ""}>{zError}</div>
    <label>Enter A Number For Divisor 1 (Optional): <input type ="number" onChange ={handleDivisor1Change} value = {divisor1} placeholder = "value" /></label><div className={divisor1Error ? "error" : ""}>{divisor1Error}</div>
    <label>Enter A Number For Divisor 2 (Optional): <input type ="number" onChange ={handleDivisor2Change} value = {divisor2} placeholder = "value"/></label><div className={divisor2Error ? "error" : ""}>{divisor2Error}</div>
    <label>Enter A Word For Divisor 1 (Optional): <input type ="text" onChange ={handleDivisor1WordChange} value = {divisor1word} placeholder = "value"/></label><div></div>
    <label>Enter A Word For Divisor 2 (Optional): <input type ="text" onChange ={handleDivisor2WordChange} value = {divisor2word} placeholder = "value"/></label><div></div>
    {/* The User's inputs and Button to trigger output generation */}
    <div>Divisor 1: {divisor1}</div>
    <div>Divisor 1's Word: {divisor1word}</div>
    <div># of {divisor1word}: {FizzCount} </div>
    <div>____________________________</div>
    <div>Divisor 2: {divisor2}</div>
    <div>Divisor 2's Word: {divisor2word}</div>
    <div># of {divisor2word}: {BuzzCount} </div>
    <div># of {divisor1word}{divisor2word}: {FizzBuzzCount} </div>
    <div>____________________________</div>
    <div>Value Of X: {x}</div>
    <div>Value Of Y: {y}</div>
    <div>Value Of Z: {z}</div>
     {/* Generates Output/Reset button */}
    <button onClick={generateOutput}>Generate</button>
    <button onClick={resetValues}>Reset</button>
    {/* Display the generated output */}
    <div className="output">{output }</div>
  </div>
);
}
// Export the App component for use in other files
export default App;
