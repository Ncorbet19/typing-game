function resetGame() {
    wordCount = 0;
    startTime = new Date();
    updateCountdown();
  }

  document.getElementById('restart').addEventListener('click', function () {
    resetGame();
  });

  let startTime = new Date();
  let wordCount = 0;
  const targetWordCount = 20;

  function showPopup(wpm) {
    alert(`You typed ${targetWordCount} words! Your WPM: ${wpm}`);
  }

  function updateCountdown() {
    const remainingWords = targetWordCount - wordCount;
    document.getElementById('countdown').innerText = remainingWords;
  }

  function updateWPM() {
    const elapsedTime = (new Date() - startTime) / 1000 / 60; // Convert milliseconds to minutes
    const wpm = (wordCount / elapsedTime).toFixed(1);
    return wpm;
  }

  document.getElementById('input').addEventListener('input', function (e) {
    if (e.target.value === currentWord) {
      e.target.value = '';
      newWord();
      wordCount++; // Increment the word count
      updateCountdown(); // Update the countdown display

      if (wordCount === targetWordCount) {
        const wpm = updateWPM(); // Calculate the WPM
        showPopup(wpm); // Show the popup with the WPM
      }
    }
  });


  const words = [
'apple', 'banana', 'cat', 'dog', 'elephant',
'frog', 'giraffe', 'hippopotamus', 'iguana',
'jaguar', 'kangaroo', 'lion', 'monkey',
'newt', 'octopus', 'penguin', 'quail',
'rabbit', 'snake', 'turtle', 'umbrella',
'vampire', 'whale', 'xenops', 'yak', 'zebra',
'albatross', 'beaver', 'camel', 'dolphin',
'echidna', 'flamingo', 'gorilla', 'hamster',
'ibex', 'jellyfish', 'koala', 'lemur',
'mongoose', 'narwhal', 'ostrich', 'platypus',
'quetzal', 'rhinoceros', 'sloth', 'toucan',
'urchin', 'vulture', 'walrus', 
'yabby', 'zeppelin', 'ant', 'bear',
'cheetah', 'donkey', 'eagle', 'falcon',
'goat', 'hedgehog', 'impala', 'jackal',
'kite', 'llama', 'meerkat', 'numbat',
'otter', 'peacock', 'quokka', 'raccoon',
'skunk', 'tiger', 'unicorn', 'vicuna',
'wombat', 'xerus', 'yellowjacket', 'zorse'
];


  let currentWord = '';

  function newWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById('word').innerText = currentWord;
    highlightKey(currentWord[0]);
  }

  document.getElementById('input').addEventListener('input', function (e) {
    const typedValue = e.target.value;
    let match = true;

    for (let i = 0; i < typedValue.length; i++) {
      if (typedValue[i] !== currentWord[i]) {
        match = false;
        break;
      }
    }

    if (match) {
      if (typedValue.length === currentWord.length) {
        e.target.value = '';
        newWord();
      } else {
        highlightKey(currentWord[typedValue.length]);
      }
    } else {
      e.target.value = typedValue.slice(0, -1);
    }
  });

  const keyboardLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  function createKeyboard() {
    const keyboardDiv = document.getElementById('keyboard');
    keyboardLayout.forEach(row => {
      const rowDiv = document.createElement('div');
      row.forEach(key => {
        const keyDiv = document.createElement('div');
        keyDiv.classList.add('key');
        keyDiv.id = `key-${key}`;
        keyDiv.innerText = key;
        rowDiv.appendChild(keyDiv);
      });
      keyboardDiv.appendChild(rowDiv);
    });
  }

  function createKeyboard() {
    const keyboardDiv = document.getElementById('keyboard');
    keyboardLayout.forEach(row => {
      const rowDiv = document.createElement('div');
      row.forEach(key => {
        const keyDiv = document.createElement('div');
        keyDiv.classList.add('key');
        keyDiv.id = `key-${key}`;
        keyDiv.innerText = key;
        rowDiv.appendChild(keyDiv);
      });
      keyboardDiv.appendChild(rowDiv);
    });
  }

  function highlightKey(letter) {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
      key.classList.remove('highlighted');
    });
    const keyToHighlight = document.getElementById(`key-${letter.toLowerCase()}`);
    if (keyToHighlight) {
      keyToHighlight.classList.add('highlighted');
    }
  }

  document.getElementById('toggleKeyboard').addEventListener('click', function () {
    const keyboard = document.getElementById('keyboard');
    if (keyboard.style.display === 'none') {
      keyboard.style.display = 'block';
      this.innerText = 'Hide Keyboard';
    } else {
      keyboard.style.display = 'none';
      this.innerText = 'Show Keyboard';
    }
  });

  createKeyboard();
  newWord();
  document.getElementById('keyboard').style.display = 'none';