// function toggleInput() {
//   var input = document.getElementById("text-input");
//   if (input.type === "password") {
//     input.type = "text";
//   } else {
//     input.type = "password";
//   }
// }

document.addEventListener("input", async function () {
  const textValue = document.getElementById("text-input").value;
  const numberValue1 = document.getElementById("number-input1").value;
  const numberValue2 = document.getElementById("number-input2").value;
  const hashedValue = await stretchHash(textValue, numberValue1);
  const limitedHash = hashedValue.slice(0, numberValue2);

  const output = document.getElementById("output-window");
  output.textContent = limitedHash + "\n";
});

// function generatePassword(input) {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(input);

//   return crypto.subtle
//     .digest("SHA-256", data)
//     .then((hashBuffer) => {
//       const hashArray = Array.from(new Uint8Array(hashBuffer));
//       const hashHex = hashArray
//         .map((byte) => byte.toString(16).padStart(2, "0"))
//         .join("");
//       return hashHex;
//     })
//     .catch((error) => {
//       console.error("SHA256 Hashing Error:", error);
//       return "";
//     });
// }

function generatePassword(input) {
  const seed = hashCode(input);

  // 乱数生成器のシード値を設定
  Math.seedrandom(seed);

  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  let password = "";

  for (let i = 0; i < 50; i++) {
    const charIndex = Math.floor(Math.random() * characters.length);
    password += characters[charIndex];
  }

  return password;
}

function hashCode(input) {
  let hash = 0;
  if (input.length === 0) {
    return hash;
  }
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString();
}

async function stretchHash(input, iterations) {
  let hashedValue = input;
  for (let i = 0; i < iterations; i++) {
    hashedValue = await generatePassword(hashedValue);
  }
  return hashedValue;
}

function applyBlurEffect(input_id) {
  const outputWindow = document.getElementById(input_id);
  const eyeIcon = document.querySelector(input_id + "> .eye-icon");
  outputWindow.classList.toggle("blurred");
  eyeIcon.classList.toggle("disabled");
}

async function copyHashToClipboard() {
  const textValue = document.getElementById("text-input").value;
  const numberValue1 = document.getElementById("number-input1").value;
  const numberValue2 = document.getElementById("number-input2").value;
  const hashedValue = await stretchHash(textValue, numberValue1);
  const limitedHash = hashedValue.slice(0, numberValue2);
  navigator.clipboard
    .writeText(limitedHash)
    .then(function () {
      alert("Hash copied to clipboard!");
    })
    .catch(function (error) {
      alert("Failed to copy hash to clipboard: " + error);
    });
}
