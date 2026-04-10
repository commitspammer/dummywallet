let balance = parseFloat(localStorage.getItem("balance")) || 0;

const balanceEl = document.getElementById("balance");
const resetBtn = document.getElementById("resetBtn");

updateUI();

function updateUI() {
  balanceEl.innerText = "$" + balance.toFixed(2);
  localStorage.setItem("balance", balance);
}

// QR SCANNER
function startScanner() {
  const reader = document.getElementById("reader");
  reader.style.display = "block";

  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      let amount = parseFloat(decodedText);

      if (!isNaN(amount)) {
        balance += amount;
        updateUI();
      }

      html5QrCode.stop();
      reader.style.display = "none";
    }
  );
}

// HOLD TO RESET (7 seconds)
let holdTimer;

resetBtn.addEventListener("mousedown", startHold);
resetBtn.addEventListener("touchstart", startHold);

resetBtn.addEventListener("mouseup", cancelHold);
resetBtn.addEventListener("mouseleave", cancelHold);
resetBtn.addEventListener("touchend", cancelHold);

function startHold() {
  holdTimer = setTimeout(() => {
    balance = 0;
    updateUI();
    alert("Wallet reset");
  }, 7000);
}

function cancelHold() {
  clearTimeout(holdTimer);
}
