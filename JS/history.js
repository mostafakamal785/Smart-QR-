import {
  qrCodeContainer,
  qrSize,
  darkColorInput,
  whiteColorInput,
  historyList,
} from "./ui-elements.js";

function addHistoryEventListeners(listItem, qrImageSrc, text) {
  // Event: Download from history
  listItem.querySelector(".histDownloadBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = qrImageSrc;
    link.download = "QR_Code.png";
    link.click();
  });

  // Event: Delete from history
  listItem.querySelector(".histDeletBtn").addEventListener("click", () => {
    listItem.remove();
  });

  // Event: Regenerate from history
  listItem.querySelector(".histRegenerateBtn").addEventListener("click", () => {
    qrCodeContainer.innerHTML = "";
    qrCodeContainer.classList.add("hasQrCode");
    new QRCode(qrCodeContainer, {
      text: text,
      width: parseInt(qrSize.value),
      height: parseInt(qrSize.value),
      colorDark: darkColorInput.value,
      colorLight: whiteColorInput.value,
      correctLevel: QRCode.CorrectLevel.H,
    });
  });
}

export function addToHistory(qrImageElement, text, type) {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

  const listItem = document.createElement("li");
  listItem.classList.add("historyCard");

  listItem.innerHTML = `
    <div class="cardSrc">
      <div class="smalQr">
        <img src="${qrImageElement.src}" alt="QR code" />
      </div>
      <div class="cardDeatails">
        <p><strong>[${type.toUpperCase()}]</strong> ${text}</p>
        <p><strong>Date:</strong> ${formattedDate} <strong>Time:</strong> ${formattedTime}</p>
      </div>
    </div>
    <div class="cardOptions">
      <button class="histRegenerateBtn">
        <i class="fa-solid fa-arrows-rotate"></i>
        <span>Regenerate</span>
      </button>
      <button class="histDownloadBtn">
        <i class="fa-solid fa-download"></i>
        <span>Download</span>
      </button>
      <button class="histDeletBtn">
        <i class="fa-solid fa-trash"></i>
        <span>Delete</span>
      </button>
    </div>
  `;

  addHistoryEventListeners(listItem, qrImageElement.src, text);
  historyList.prepend(listItem);
}
