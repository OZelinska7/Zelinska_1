
const prices = [150, 0, 45, 320, 0, 85];
let totalCartValue = 0;
let finalToPay = 0;     
let cashReceived = 0;  


function calculateCart() {
  let sum = 0;

  for (let i = 0; i < prices.length; i++) {
    
    if (prices[i] === 0) {
      continue; 
    }
    
    sum = sum + (prices[i] * 1.2);
  }

 
  totalCartValue = sum;
  finalToPay = sum;

  
  document.getElementById('receiptRawTotal').innerText = totalCartValue + ' грн';
  document.getElementById('receiptToPay').innerText = finalToPay + ' грн';
  
  
  document.getElementById('btnApplyBonuses').disabled = false;

  
  validatePromoCode();
}



function validatePromoCode() {
  const promo = "SALE-2024-UA";
  let digitsCount = 0;
  let lettersCount = 0;

 
  for (const char of promo) {
    if (char === "-") {
      continue; 
    }

    if (char >= "0" && char <= "9") {
      digitsCount++; 
    } 
    else if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) {
      lettersCount++; 
    } 
    else {
      
      console.log("Помилка! Знайдено невідомий символ:", char);
      break; 
    }
  }

  console.log("Промокод перевірено. Літер:", lettersCount, "Цифр:", digitsCount);
}



function applyBonuses() {
  
  let bonuses = Number(document.getElementById('bonusBalanceInput').value);
  let discount = 0;
  let maxDiscount = totalCartValue / 2; // Знижка не більше 50%

 
  while (bonuses >= 50 && (discount + 50) <= maxDiscount) {
    bonuses = bonuses - 50;
    discount = discount + 50;
  }

  
  finalToPay = totalCartValue - discount;

 
  document.getElementById('receiptDiscount').innerText = "-" + discount + " грн";
  document.getElementById('receiptToPay').innerText = finalToPay + " грн";
  
 
  document.getElementById('btnValidateCash').disabled = false;
  document.getElementById('btnApplyBonuses').disabled = true;
}



function validateCashInput() {
  let userInput;

  
  do {
    
    userInput = prompt("До сплати: " + finalToPay + " грн. Введіть суму готівки:");
    cashReceived = Number(userInput);
    
   
  } while (userInput === "" || isNaN(cashReceived) || cashReceived < finalToPay);

  
  document.getElementById('cashInput').value = cashReceived; 
  document.getElementById('receiptCash').innerText = cashReceived + " грн";
  document.getElementById('validationMsg').innerText = "Готівку прийнято успішно!";
  
  // Вмикаємо останню кнопку
  document.getElementById('btnCalculateChange').disabled = false;
}



function calculateChange() {
  let change = cashReceived - finalToPay;
  document.getElementById('receiptChange').innerText = change + " грн";

  const notes = [500, 200, 100, 50, 20, 10, 5, 2, 1];
  let i = 0;
  let resultText = ""; 

  
  while (change > 0 && i < notes.length) {
    let currentNote = notes[i];

    if (change >= currentNote) {
      let count = Math.floor(change / currentNote); 
      change = change % currentNote;               
      resultText += `<p class="text-purple-700 font-bold">Видано ${currentNote} грн: ${count} шт.</p>`;
    }
    i++; 
  }

  document.getElementById('banknotesResult').innerHTML = resultText || "Без решти";
  document.getElementById('btnCalculateChange').disabled = true;
}


function resetAll() {
  location.reload(); 
}