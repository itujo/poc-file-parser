const fs = require('fs');

// Função para gerar um número aleatório de 20 dígitos como uma string
function generateRandomNumber(numDigits) {
  let result = '';
  for (let i = 0; i < numDigits; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

// Função principal para criar o arquivo com números únicos
async function createUniqueNumbersFile(numLines, numDigits, filePath) {
  const seen = new Set();
  const stream = fs.createWriteStream(filePath, { flags: 'a' });

  return new Promise((resolve, reject) => {
    stream.on('error', reject);
    let count = 0;

    function write() {
      let ok = true;
      while (count < numLines && ok) {
        let number;
        do {
          number = generateRandomNumber(numDigits);
        } while (seen.has(number));

        seen.add(number);
        count++;
        if (count < numLines) {
          ok = stream.write(number + '\n');
        } else {
          // Último número, fechar o stream depois.
          stream.end(number + '\n');
        }
      }

      if (count < numLines) {
        // Se o stream não estiver pronto para mais escritas, aguarde até que esteja.
        stream.once('drain', write);
      }
    }

    stream.on('finish', resolve);
    write();
  });
}

const numLines = 10000000; // 100 mil linhas
const numDigits = 20; // Números de 20 dígitos
const fileName = '10m';
const filePath = `./resources/${fileName}.txt`;

createUniqueNumbersFile(numLines, numDigits, filePath)
  .then(() => console.log('File successfully created!'))
  .catch((err) => console.error('Error creating the file:', err));
