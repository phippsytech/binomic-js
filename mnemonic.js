import {wordList} from "./word-list.js";
// import {wordList} from "./eff-large-wordlist.js";

// Function for converting binary string to mnemonic
export function binaryToMnemonic(binaryString) {
  // Split the binary string into groups of 11 bits
  const groups = binaryString.match(/.{1,11}/g);

  // Convert each group to a number and look up the corresponding word in the word list
  const words = groups.map(group => {
    const index = parseInt(group, 2);
    
    return wordList[index];
  });

  // Join the words with spaces and return the mnemonic
  return words.join(" ");
}

// Function for converting mnemonic to binary string
export function mnemonicToBinary(mnemonic) {
  // Split the mnemonic into words
  const words = mnemonic.split(" ");
  let binaryStringLength=0;
  // Convert each word to a binary string and concatenate them
  const binaryString = words.map((word, i) => {
    
    const index = wordList.indexOf(word);

    binaryStringLength += 11;

    if (index === -1) {
      throw new Error(`Word '${word}' not found in word list`);
    }
    
    if (i < words.length - 1) {
      return index.toString(2).padStart(11, "0");
    }else{
      let padding = 1104 - (binaryStringLength-11);
      return index.toString(2).padStart(padding, "0");
    }
    
    

  }).join("");

  // Return the binary string
  return binaryString;
}
  
  
export function arrayBufferToBinary(arrayBuffer) {
  const dataView = new DataView(arrayBuffer);
  let binaryString = '';
  for (let i = 0; i < dataView.byteLength; i++) {
    const byte = dataView.getUint8(i);
    binaryString += byte.toString(2).padStart(8, '0');
  }
  return binaryString;
}


export function binaryToArrayBuffer(binaryString) {
  const length = binaryString.length / 8;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);
  for (let i = 0; i < length; i++) {
    const byte = binaryString.slice(i * 8, (i + 1) * 8);
    view.setUint8(i, parseInt(byte, 2));
  }
  return buffer;
}

