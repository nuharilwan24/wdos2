   const phoneInputField = document.querySelector("#phone");
   const phoneInput = window.intlTelInput(phoneInputField, {
     utilsScript:
       "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    function submitButton() {
        const fullName = document.getElementById("fname").value;
        const mobilePhone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const gender = document.getElementById("gender").value;
      
        const userData = {
          fullName: fullName,
          mobilePhone: mobilePhone,
          email: email,
          gender: gender
        };
      
        // Store userData in localStorage
        localStorage.setItem("userData", JSON.stringify(userData));
      
        // Display user data in the summary table
        displayUserData();
      }
      
      function displayUserData() {
        const userDataString = localStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const userDataBody = document.getElementById("userDataBody");
      
          // Create a new row for the user data
          const newRow = document.createElement("tr");
      
          // Create cells for each user property and append them to the row
          for (const property in userData) {
            const newCell = document.createElement("td");
            newCell.textContent = userData[property];
            newRow.appendChild(newCell);
          }
      
          // Append the row to the user data table's tbody
          userDataBody.appendChild(newRow);
        }
      }
function toPurchase(){
  window.location.href="payment.html";
}  