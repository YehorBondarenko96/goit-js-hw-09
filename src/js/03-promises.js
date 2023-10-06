import Notiflix from 'notiflix';

const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');



function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    const idInterval = setInterval(() => {
      if (shouldResolve) {
        resolve({position, delay});
    } else {
        reject({position, delay});
    }
    }, delay);
  })
};

function multiplyPromises(event) {
  event.preventDefault();
  let delay = Number(firstDelay.value);
  for (let position = 1; position <= Number(amount.value); position++) {
    const promis = createPromise(position, delay);
    promis.then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    
    delay += Number(delayStep.value);
  }
};

form.addEventListener('submit', multiplyPromises);



