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
  ssid: document.querySelector(".wifi input[type='text']"),
  password: document.querySelectorAll(".wifi input[type='text']")[1],
  encryption: document.querySelector(".wifi select"),
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

// OCR
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
const generatQrsample = (
  value,
  originalTextForHistory = value,
  qrType = "Text"
) => {
  if (!value.trim()) {
    alert("Please enter content to generate the QR code.");
    qrCodeContainer.innerHTML = "";
    qrCodeContainer.classList.remove("has-QR-code");
    return;
  }

  qrCodeContainer.innerHTML = "";
  qrCodeContainer.classList.add("has-QR-code");

  const qrcode = new QRCode(qrCodeContainer, {
    text: value,
    width: parseInt(qrSize.value),
    height: parseInt(qrSize.value),
    colorDark: darkColorInput.value,
    colorLight: whiteColorInput.value,
    correctLevel: QRCode.CorrectLevel.H,
  });

  // انتظر حتى يتم توليد <img> فعليًا
  setTimeout(() => {
    const qrImage = qrCodeContainer.querySelector("img");
    if (qrImage) {
      addToHistory(qrImage, originalTextForHistory, qrType);
    }
  }, 300); // تأخير بسيط لضمان وجود <img>
};

function addToHistory(qrImageElement, text, type) {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

  const listItem = document.createElement("li");
  listItem.classList.add("history-carde");

  listItem.innerHTML = `
    <div class="carde-src">
      <div class="smal-QR">
        <img src="${qrImageElement.src}" alt="QR code" />
      </div>
      <div class="carde-deatails">
        <p><strong>[${type.toUpperCase()}]</strong> ${text}</p>
        <p><strong>Date:</strong> ${formattedDate} <strong>Time:</strong> ${formattedTime}</p>
      </div>
    </div>
    <div class="carde-options">
      <button class="hist-regenerateBTN">
        <i class="fa-solid fa-arrows-rotate"></i>
        <span>Regenerate</span>
      </button>
      <button class="hist-downloadBTN">
        <i class="fa-solid fa-download"></i>
        <span>Download</span>
      </button>
      <button class="hist-deletBTN">
        <i class="fa-solid fa-trash"></i>
        <span>Delete</span>
      </button>
    </div>
  `;

  // إضافة الأحداث
  listItem.querySelector(".hist-downloadBTN").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = qrImageElement.src;
    link.download = "QR_Code.png";
    link.click();
  });

  listItem.querySelector(".hist-deletBTN").addEventListener("click", () => {
    listItem.remove();
  });

  listItem
    .querySelector(".hist-regenerateBTN")
    .addEventListener("click", () => {
      qrCodeContainer.innerHTML = "";
      qrCodeContainer.classList.add("has-QR-code");
      const newQR = new QRCode(qrCodeContainer, {
        text: text,
        width: parseInt(qrSize.value),
        height: parseInt(qrSize.value),
        colorDark: darkColorInput.value,
        colorLight: whiteColorInput.value,
        correctLevel: QRCode.CorrectLevel.H,
      });
      newQR.makeCode(text);
    });

  historyList.prepend(listItem); // أضف العنصر في الأعلى
}

generateBtn.addEventListener("click", () => {
  qrCodeContainer.innerHTML = ""; // Clear previous QR code

  qrCodeContainer.classList.add("has-QR-code"); // Add the class to hide the ::after element
  const slectedvalue = qrTypeSelector.value;
  switch (slectedvalue) {
    case "sms":
      const smsvalue = smsField.value;
      generatQrsample(smsvalue);
      break;
    case "text":
      const textvalue = textField.value;
      generatQrsample(textvalue);
      break;
    case "phone":
      const phoneRegex = /^[0-9]+$/;
      const phonevalue = phoneField.value;

      // التحقق الأول: هل كل الحقول ممتلئة؟
      if (!phoneRegex.test(phonevalue)) {
        alert("Please fill in all phone fields.");
        return;
      }
      generatQrsample(phonevalue);
      break;
    case "url":
      const urlRegex = /^[https://]+[^\s]+$/;
      const urlvalue = urlField.value;

      // التحقق الأول: هل كل الحقول ممتلئة؟
      if (!urlRegex.test(urlvalue)) {
        alert("Please fill in all url fields.");
        return;
      }
      generatQrsample(urlvalue);
      break;
    case "email":
      const emailAddress = emailField.address.value.trim(); // استخدام .trim() مهم هنا
      const subject = emailField.subject.value.trim();
      const body = emailField.body.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // التحقق الأول: هل كل الحقول ممتلئة؟
      if (!emailAddress || !subject || !body) {
        alert("Please fill in all email fields.");
        return;
      }
      // التحقق الثاني: هل عنوان البريد الإلكتروني صالح؟
      else if (!emailRegex.test(emailAddress)) {
        alert("Please enter a valid email address.");
        return;
      } else {
        const emailContent = `mailto:${emailAddress}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
        generatQrsample(emailContent);
      }
      break;
    case "wifi":
      const ssid = wifiField.ssid.value.trim();
      const password = wifiField.password.value.trim();
      const encryption = wifiField.encryption.value;

      // التحقق من أن SSID وكلمة المرور ليست فارغة
      if (!ssid || !password) {
        alert("Please enter SSID and Password for the Wi-Fi network.");
        return;
      }

      // تحديد نوع التشفير: إذا كان "none" استخدم "nopass"
      const encryptionFixed = encryption === "none" ? "nopass" : encryption;

      const wifiContent = `WIFI:S:${ssid};T:${encryptionFixed};P:${password};;`;
      generatQrsample(wifiContent);
      break;
    case "vcard":
      const { name, org, title, phone, email, site } = vcardField;
      const vcard = `
      BEGIN:VCARD
      VERSION:3.0
      FN:${name.value}
      ORG:${org.value}
      TITLE:${title.value}
      TEL:${phone.value}
      EMAIL:${email.value}
      URL:${site.value}
      END:VCARD`.trim();

      generatQrsample(vcard);
      break;
    default:
      break;
  }
});
qrSize.addEventListener("input", (e) => {
  qrSizeValue.textContent = e.target.value;
});

const downloadBtn = document.querySelector(".downloadBTN");

downloadBtn.addEventListener("click", () => {
  const qrImage = qrCodeContainer.querySelector("img");
  if (!qrImage) {
    alert("Please generate a QR code first.");
    return;
  }

  const imageURL = qrImage.src;

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "QR_Code.png"; // اسم الملف
  link.click();
});
const shareBtn = document.querySelector(".shareBTN");

shareBtn.addEventListener("click", async () => {
  const qrImage = qrCodeContainer.querySelector("img");
  if (!qrImage) {
    alert("Please generate a QR code first.");
    return;
  }

  // تحميل الصورة وتحويلها إلى blob
  const response = await fetch(qrImage.src);
  const blob = await response.blob();
  const file = new File([blob], "QR_Code.png", { type: blob.type });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: "Smart QR Code",
        text: "Here's a QR code I generated",
        files: [file],
      });
    } catch (error) {
      console.error("Sharing failed", error);
    }
  } else {
    alert("Sharing is not supported on this browser.");
  }
});
