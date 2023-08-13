function submitButton() {
    const NameonCard = document.getElementById("cname").value;
    const CreditcardNumber = document.getElementById("ccnum").value;
    const ExpiryDate = document.getElementById("expdate").value;
    const CVV = document.getElementById("cvv").value;
  
    const userData = {
      NameonCard: NameonCard,
      CreditcardNumber: CreditcardNumber,
      ExpiryDate: ExpiryDate,
      CVV: CVV
    };
  
    // Store the user data in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    
    displayUserData(); // Call the function to display user data
  }
  function displayUserData() {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userDataBody = document.getElementById("userDataBody");
  
      // Create a new row and cells to display the user data
      const newRow = document.createElement("tr");
      for (const property in userData) {
        const newCell = document.createElement("td");
        newCell.textContent = userData[property];
        newRow.appendChild(newCell);
      }
  
      // Append the row to the table body
      userDataBody.appendChild(newRow);
    }
  } 
  
  const phoneInputField = document.querySelector("#phone");
  const phoneInput = window.intlTelInput(phoneInputField, 
  {
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });
function confirmation(){
    window.location.href="confirmation.html";
} 