import {
  qrCodeContainer,
  qrSize,
  darkColorInput,
  whiteColorInput,
  qrTypeSelector,
  smsField,
  textField,
  phoneField,
  urlField,
  emailField,
  wifiField,
  vcardField,
} from "./ui-elements.js";
import { addToHistory } from "./history.js";

// هذه الوظيفة تجمع البيانات من الحقول بناءً على النوع المحدد
export function getCurrentQrData() {
  const selectedValue = qrTypeSelector.value;
  let content = null;
  let originalText = "";

  switch (selectedValue) {
    case "text":
      content = originalText = textField.value;
      break;
    case "url":
      if (/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(urlField.value)) {
        content = originalText = urlField.value;
      } else {
        alert("Please enter a valid URL starting with http:// or https://");
      }
      break;
    // ...
    case "phone":
      if (/^[0-9]+$/.test(phoneField.value)) {
        content = originalText = phoneField.value;
      } else {
        alert("Please enter a valid phone number.");
      }
      break;
    case "sms":
      content = originalText = smsField.value;
      break;
    case "email":
      const { address, subject, body } = emailField;
      if (!address.value || !subject.value || !body.value) {
        alert("Please fill in all email fields.");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.value)) {
        alert("Please enter a valid email address.");
      } else {
        content = `mailto:${address.value.trim()}?subject=${encodeURIComponent(
          subject.value.trim()
        )}&body=${encodeURIComponent(body.value.trim())}`;
        originalText = `Email to: ${address.value.trim()}`;
      }
      break;
    case "wifi":
      const { ssid, password, encryption } = wifiField;
      if (!ssid.value || !password.value) {
        alert("Please enter SSID and Password for the Wi-Fi network.");
      } else {
        const encType =
          encryption.value === "none" ? "nopass" : encryption.value;
        content = `WIFI:S:${ssid.value.trim()};T:${encType};P:${password.value.trim()};;`;
        originalText = `WiFi: ${ssid.value.trim()}`;
      }
      break;
    case "vcard":
      const { name, org, title, phone, email, site } = vcardField;
      content = `BEGIN:VCARD\nVERSION:3.0\nFN:${name.value}\nORG:${org.value}\nTITLE:${title.value}\nTEL:${phone.value}\nEMAIL:${email.value}\nURL:${site.value}\nEND:VCARD`;
      originalText = `vCard: ${name.value}`;
      break;
  }
  return { content, originalText, type: selectedValue };
}

// هذه الوظيفة تولد الـ QR الفعلي
export function generateQrSample({ content, originalText, type }) {
  if (!content || !content.trim()) {
    if (content !== null)
      alert("Please enter content to generate the QR code.");
    qrCodeContainer.innerHTML = "";
    qrCodeContainer.classList.remove("hasQrCode");
    return;
  }

  qrCodeContainer.innerHTML = "";
  qrCodeContainer.classList.add("hasQrCode");

  new QRCode(qrCodeContainer, {
    text: content,
    width: parseInt(qrSize.value),
    height: parseInt(qrSize.value),
    colorDark: darkColorInput.value,
    colorLight: whiteColorInput.value,
    correctLevel: QRCode.CorrectLevel.H,
  });

  setTimeout(() => {
    const qrImage = qrCodeContainer.querySelector("img");
    if (qrImage) {
      addToHistory(qrImage, originalText, type);
    }
  }, 300);
}
