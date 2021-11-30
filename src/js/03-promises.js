import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(pos, delay) {
  const shouldResolve = Math.random() > 0.3;
 //console.log(shouldResolve)
  return new Promise((resolve, reject) => {
  
    setTimeout(() => {
     if (shouldResolve) {
       resolve ({pos, delay});
  } else {
     reject ({pos, delay});
      };
    }, delay);
  });
  
};
const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let {delay, step, amount} = e.currentTarget;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);

  for (let pos = 1; pos <= amount; pos +=1) {
    createPromise(pos, delay)
      .then(({ pos, delay }) => {
    Notify.success(`Fulfilled promise ${pos} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${pos} in ${delay}ms`);
    
  })
      .catch(({ pos, delay }) => {
      Notify.failure(`Rejected promise ${pos} in ${delay}ms`);
   console.log(`❌ Rejected promise ${pos} in ${delay}ms`);
  });
delay += step
  };
};
