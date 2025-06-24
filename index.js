// عناصر الـ QR
const qrCodeContainer = document.querySelector(".QR-code");
const qrSize = document.getElementById("QRsize");
const qrSizeValue = document.getElementById("QRsize-value");
const darkColorInput = document.getElementById("darkcolor");
const whiteColorInput = document.getElementById("whitecolor");
const generateBtn = document.querySelector(".generateQR-btn");
const qrTypeSelector = document.getElementById("QRType");

// مدخلات المحتوى
const inputFields = document.querySelectorAll(".input-fild");
const smsField = document.querySelector(".sms textarea");
const textField = document.querySelector(".text input");
const phoneField = document.querySelector(".phone input");
const urlField = document.querySelector(".url input");

// البريد الإلكتروني
const emailField = {
  address: document.querySelector(".email-address"),
  subject: document.querySelector(".Subject"),
  body: document.getElementById("email-body"),
};

// WiFi
const wifiField = {
  ssid: document.querySelector(".wi-fi input[type='text']"),
  password: document.querySelectorAll(".wi-fi input[type='text']")[1],
  encryption: document.querySelector(".wi-fi select"),
};

// vCard
const vcardField = {
  name: document.querySelector(".vcard input[placeholder='Mostafa Kamal']"),
  org: document.querySelector(".vcard input[placeholder='Acme Corp']"),
  title: document.querySelector(".vcard input[placeholder='Web developement']"),
  phone: document.querySelector(".vcard input[type='number']"),
  email: document.querySelector(".vcard input[type='email']"),
  site: document.querySelector(".vcard input[type='url']"),
};

// الرفع و OCR
const uploadInput = document.getElementById("imgUploading");
const uploadSection = document.querySelector(".upload-img");
const loadingBox = document.querySelector(".loading");

// الهيستوري
const historyList = document.querySelector(".history-list");

qrTypeSelector.addEventListener("change", () => {
  inputFields.forEach((input) => {
    input.style.display = "none";
  });
  const slectedvalue = qrTypeSelector.value;
  document.querySelector(`.input-fild.${slectedvalue}`).style.display = "block";
});

// Make sure generateBtn, qrCodeContainer, textField, qrSize, darkColorInput,
// whiteColorInput, and historyList are properly defined and accessible in this scope.

generateBtn.addEventListener("click", () => {
  qrCodeContainer.innerHTML = ""; // Clear previous QR code

  // Add the class to hide the ::after element
  qrCodeContainer.classList.add("has-QR-code"); // Make sure this line is present!
  const textvalue = textField.value;
  const qrcode = new QRCode(qrCodeContainer, {
    text: textvalue,
    width: parseInt(qrSize.value),
    height: parseInt(qrSize.value),
    colorDark: darkColorInput.value,
    colorLight: whiteColorInput.value,
    correctLevel: QRCode.CorrectLevel.H,
  });
  qrcode.makeCode(textvalue);

  const qrCodeImg = qrCodeContainer.querySelector("img");
  qrCodeImg.addEventListener("load", () => {
    const reader = new FileReader();
    reader.readAsDataURL(qrCodeImg.src);
    reader.onload = () => {
      const qrCodeData = reader.result;
      console.log(qrCodeData);
      const qrCodeItem = document.createElement("li");
      qrCodeItem.innerHTML = `
        <img src="${qrCodeData}" alt="QR Code">
        <p>${textField.value}</p>
      `;
      historyList.appendChild(qrCodeItem);
    };
  });
});

qrSize.addEventListener("input", (e) => {
  qrSizeValue.textContent = e.target.value;
});
uploadImg.addEventListener("click", () => {
  uploadInput.click();
  loading.style.opacity = 1;
  loading.style.position = "relative";
  setTimeout(() => {
    loading.style.opacity = 0;
    loading.style.position = "absolute";
  }, 2000);
});

// function onScanSuccess(decodedText, decodedResult) {
//   document.getElementById("result").textContent = decodedText;
//   html5QrcodeScanner.clear(); // stop scanning after first result
// }

// function onScanFailure(error) {
//   // Optional: console.log(Scan error: ${error});
// }

// const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
//   fps: 10,
//   qrbox: 250,
// });
// html5QrcodeScanner.render(onScanSuccess, onScanFailure);
