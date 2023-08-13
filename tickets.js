//Ticket booking page JS


if (document.getElementById('ticketbooking')){
const tbodyEl = document.querySelector('tbody'); // summery table
const tickettype = ["Srilankan Adult", "Srilankan Child", "Foreign Adult", "Foreign Child", "Infant"];
const ticketprice = [4, 2, 10, 5, 0]; // prices of each category in correct order
let tickets = [0, 0, 0, 0, 0]; // Initial number of tickets for each category
const contBTN = document.getElementById('contBTN');

const incrementBtn = document.getElementsByClassName('i');
const decrementBtn = document.getElementsByClassName('d');



// Function to update the ticket count for a specific category
function updateTicketCount(index, value) {
  tickets[index] = value;
  updateSummaryTable();
}

// Increment button for guests part
for (let j = 0; j < incrementBtn.length; j++) {
  let button = incrementBtn[j];
 

  button.addEventListener('click', function (event) {
    let buttonClicked = event.target;
    let input = buttonClicked.parentElement.children[2];//parent element is [.box] and the children [2] is input field
    let inputV = input.value;
    let newV = parseInt(inputV) + 1;
    input.value = newV;
    updateTicketCount(j, newV);
  });
}

// Decrement button for guests part
for (let j = 0; j < decrementBtn.length; j++) {
  let button = decrementBtn[j];
  button.addEventListener('click', function (event) {
    let buttonClicked = event.target;
    let input = buttonClicked.parentElement.children[2];
    let inputV = input.value;
    let newV = parseInt(inputV) - 1;
    if (newV >= 0) {
      input.value = newV;
      updateTicketCount(j, newV);
    }
  });
}

// Time Slot selection
const selectBtn = document.querySelector('.select-btn'),
  slots = document.querySelectorAll('.slots');

selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle('open');
});

slots.forEach(slot => {
  slot.addEventListener('click', () => {
    slot.classList.toggle("checked");
    updateSummaryTable();
  });
});

// Function to calculate the total amount for the selected time slots and tickets
function calculateTotal() {
  const checkedSlots = document.querySelectorAll('.slots.checked');
  let numberOfTimeSlot = checkedSlots.length;
  let peak = 0;

  for (let j = 0; j < numberOfTimeSlot; j++) {
    const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
    if (slotText >= 4 && slotText <= 6) {
      peak++;
    }
    if (slotText >= 9 && slotText <= 11) {
        peak++;
      }
    
  }

  let peakhourstotal = [peak * 2, peak, peak * 3, peak * 3, 0];

  let totalAmount = 0;
  for (let i = 0; i < tickettype.length; i++) {
    totalAmount += numberOfTimeSlot * (ticketprice[i] * tickets[i]) + (peakhourstotal[i] * tickets[i]);
  }

  return totalAmount;
}

// Function to update the summary table
function updateSummaryTable() {
  let totalAmount = calculateTotal();
  let html = `
    <tr>
      <td>Date</td>
      <td>7-31-2023</td>
    </tr>
    <tr>
      <td>Peak hours</td>
      <td>${calculateTotalPeakHours()} Hours</td>
    </tr>
  `;
  
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i] > 0) {
      html += `
        <tr>
          <td>${tickettype[i]} x ${tickets[i]}</td>
          <td>${calculateCategoryTotal(i)}</td>
        </tr>
      `;
    }
  }

  html += `
    <tr>
      <th>Total Amount</th>
      <td>${totalAmount} USD</td>
    </tr>

  
  `
  ;
  localStorage.setItem('tabledetails',html);
  tbodyEl.innerHTML = html;
  saveTicketDataToLocalStorage();

  if (totalAmount > 0) {
    contBTN.removeAttribute('disabled');
  } else {
    contBTN.setAttribute('disabled', 'true');
  }
  
  
}


function redirectToDetailsPage() {
  const totalAmount = calculateTotal();

  
  if (totalAmount > 0) {
    window.location.href = 'tickets.css'; 
  }
}


contBTN.addEventListener('click', redirectToDetailsPage);

// function to save data to local storage......................
function saveTicketDataToLocalStorage() {
    const ticketData = {
      tickettype: tickettype,
      ticketprice: ticketprice,
      tickets: tickets
    };
  
    localStorage.setItem('ticketData', JSON.stringify(ticketData));
  }

 
// Function to calculate the total amount for a specific category
function calculateCategoryTotal(categoryIndex) {
  const checkedSlots = document.querySelectorAll('.slots.checked');
  let numberOfTimeSlot = checkedSlots.length;
  let peak = 0;

  for (let j = 0; j < numberOfTimeSlot; j++) {
    const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
    if (slotText >= 4 && slotText <= 6) {
      peak++;
    }
    if (slotText >= 9 && slotText <= 11) {
        peak++;
      }
    

  }
  

  let peakhourstotal = [peak * 2, peak, peak * 3, peak * 3, 0];

  let totalAmount = numberOfTimeSlot * (ticketprice[categoryIndex] * tickets[categoryIndex]) + (peakhourstotal[categoryIndex] * tickets[categoryIndex]);

  return totalAmount;


  }

// Function to calculate the total peak hours
function calculateTotalPeakHours() {
  const checkedSlots = document.querySelectorAll('.slots.checked');
  let numberOfTimeSlot = checkedSlots.length;
  let peak = 0;

  for (let j = 0; j < numberOfTimeSlot; j++) {
    const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
    if (slotText >= 4 && slotText <= 6) {
      peak++;
    }
    if (slotText >= 9 && slotText <= 11) {
        peak++;
      }
  }
 localStorage.setItem("peakhrs",peak);
  return peak;
}
}
function toDetails(){
    window.location.href="details.html"
}