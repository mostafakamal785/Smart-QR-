// QR Elements
export const qrCodeContainer = document.querySelector(".qrCode");
export const qrSize = document.getElementById("qrSize");
export const qrSizeValue = document.getElementById("qrSizeValue");
export const darkColorInput = document.getElementById("darkColor");
export const whiteColorInput = document.getElementById("whiteColor");
export const generateBtn = document.querySelector(".generateQrBtn");
export const qrTypeSelector = document.getElementById("qrType");

// Content Inputs
export const inputFields = document.querySelectorAll(".inputFild");
export const smsField = document.querySelector(".sms textarea");
export const textField = document.querySelector(".text input");
export const phoneField = document.querySelector(".phone input");
export const urlField = document.querySelector(".url input");

// Email
export const emailField = {
  address: document.querySelector(".emailAddress"),
  subject: document.querySelector(".subject"),
  body: document.getElementById("emailBody"),
};

// WiFi
export const wifiField = {
  ssid: document.querySelector(".wifi input[type='text']"),
  password: document.querySelectorAll(".wifi input[type='text']")[1],
  encryption: document.querySelector(".wifi select"),
};

// vCard
export const vcardField = {
  name: document.querySelector(".vcard input[placeholder='Mostafa Kamal']"),
  org: document.querySelector(".vcard input[placeholder='Acme Corp']"),
  title: document.querySelector(".vcard input[placeholder='Web developement']"),
  phone: document.querySelector(".vcard input[type='number']"),
  email: document.querySelector(".vcard input[type='email']"),
  site: document.querySelector(".vcard input[type='url']"),
};

// History
export const historyList = document.querySelector(".historyList");

// Theme
export const toggleModeBtn = document.querySelector(".statMood");

// Share and Download
export const downloadBtn = document.querySelector(".downloadBtn");
export const shareBtn = document.querySelector(".shareBtn");
