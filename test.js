// function generatePassword(input) {
//   // 入力文字列をバイト配列に変換
//   const encoder = new TextEncoder();
//   const inputData = encoder.encode(input);

//   // ランダムなバイト配列を生成
//   const randomBytes = new Uint8Array(64);
//   window.crypto.getRandomValues(randomBytes);

//   // パスワードの生成
//   const characters =
//     "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
//   let password = "";

//   for (let i = 0; i < 64; i++) {
//     const charIndex = randomBytes[i] % characters.length;
//     password += characters[charIndex];
//   }

//   return password;
// }

function generatePassword(input) {
  const seed = hashCode(input);

  // 乱数生成器のシード値を設定
  Math.seedrandom(seed);

  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  let password = "";

  for (let i = 0; i < 64; i++) {
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

console.log(generatePassword("test"));
console.log(generatePassword("test"));
console.log(generatePassword("testtest"));
