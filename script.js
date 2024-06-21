let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['+', '-', '/', 'X', '+/-', '%'];

const number = document.querySelector('.calc__screen-number');
const acButton = document.querySelector('.btn_ac');
const container = document.querySelector('.container');

function clearAll() {
  a = '';
  b = '';
  sign = '';
  finish = false;
  number.textContent = 0;
}

acButton.addEventListener('click', clearAll);

function keyDownHandler(key) {
  if (digit.includes(key)) {
    if (b === '' && sign === '') {
      a += key;
      number.textContent = a;
    } else if (a !== '' && b !== '' && finish) {
      b = key;
      finish = false;
      number.textContent = b;
    } else {
      b += key;
      number.textContent = b;
    }
    return;
  }

  if (action.includes(key)) {
    sign = key;
    number.textContent = a + ' ' + sign;
    return;
  }

  if (key === '=' || key === 'Enter') {
    if (b === '') b = a;
    switch (sign) {
      case '+':
        a = (+a) + (+b);
        break;
      case '-':
        a = a - b;
        break;
      case 'X':
        a = a * b;
        break;
      case '/':
        if (b === '0') {
          number.textContent = 'Ошибка';
          a = '';
          b = '';
          sign = '';
          return;
        }
        a = a / b;
        break;
      case '%':
        a = a / 100;
        break;
      case '+/-':
        a = -a;
        break;
    }
    finish = true;
    number.textContent = a;
  } else if (key === '%') {
    if (b === '') {
      a = a / 100;
      number.textContent = a;
    } else {
      b = a * b / 100;
      number.textContent = b;
    }
  }
}

container.addEventListener('click', function(evt) {
  if (!evt.target.classList.contains('btn')) return;
  if (evt.target.classList.contains('btn_ac')) return;

  keyDownHandler(evt.target.textContent);
});

document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    clearAll();
  }
  keyDownHandler(evt.key);
});
