import { monthArray } from './date.js';

window.addEventListener('DOMContentLoaded', () => {
  const digits = getDigitTargets();
  displayDate(digits);
  startUpdateDisplayDate(digits);
  startBlinkingBullets();
});

const startBlinkingBullets = function () {
  const blinkers = document.getElementsByClassName('blink');
  let light = true;

  setInterval(() => {
    blinkers[0].classList.remove(light ? 'ON' : 'OFF');
    blinkers[1].classList.remove(light ? 'ON' : 'OFF');
    blinkers[0].classList.add(light ? 'OFF' : 'ON');
    blinkers[1].classList.add(light ? 'OFF' : 'ON');
    light = !light;
  }, 620);
};

const getDigitTargets = function () {
  const digits = [];
  const allDigits = document.getElementsByClassName('value');
  const bullets = document.getElementsByClassName('momentBullet');

  for (let i = 0; i < allDigits.length - 1; i++) {
    if (!allDigits[i].classList.contains('ghost')) {
      digits.push(allDigits[i]);
    }
  }
  return [digits, bullets];
};

const startUpdateDisplayDate = function (digits) {
  setInterval(() => {
    displayDate(digits);
  }, 1000);
};

const displayDate = function (digits) {
  const dateValues = getDateValues();
  digits[0].forEach((digit, index) => {
    digit.innerHTML = dateValues.digit[index];
  });

  const bullets = digits[1];
  bullets[0].classList.remove(dateValues.isAM ? 'OFF' : 'ON');
  bullets[0].classList.add(dateValues.isAM ? 'ON' : 'OFF');
  bullets[1].classList.remove(dateValues.isAM ? 'ON' : 'OFF');
  bullets[1].classList.add(dateValues.isAM ? 'OFF' : 'ON');
};

const getDateValues = function () {
  const currentDate = new Date();
  let AM;
  const month = monthArray[currentDate.getMonth()].toString();
  const day = addZero(currentDate.getDate()).toString();
  const year = currentDate.getFullYear().toString();
  let hours = currentDate.getHours().toString();

  if (hours >= 12) {
    hours = hours - 12;
    AM = false;
  } else {
    AM = true;
  }
  hours = addZero(hours).toString();

  const minutes = addZero(currentDate.getMinutes()).toString();

  return {
    isAM: AM,
    digit: parseDate([month, day, year, hours, minutes]),
  };
};

const parseDate = function (datas) {
  const formatted = [];

  datas.forEach((data) => {
    for (let i = 0; i < data.length; i++) {
      formatted.push(data.substring(i, i + 1));
    }
  });

  return formatted;
};

const addZero = function (value) {
  return value.toString().length === 1 ? '0' + value : value;
};
