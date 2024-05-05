const from = document.getElementById('from');
const to = document.getElementById('to');
const result = document.getElementById('result');
const input = document.getElementById('input');
const wait = document.getElementById('wait');
const submit = document.getElementById('submit');
const warning = document.getElementById('alert');
const alertDiv = document.getElementById('alertDiv');

const api = async (f, t) => {
  const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${f}.json`)
  const data = await res.json();
  const obj = data[`${f}`];
  const arr = Object.keys(obj);

  if(arr){
    wait.setAttribute('class', 'hidden')
  }

  arr.map((e)=>{
    from.innerHTML +=`<option ${e===f && 'selected'}>${e}</option>`;
    to.innerHTML += `<option ${e===t && 'selected'}>${e}</option>`;
  })

  let nr = obj[to.value];

  result.innerText = parseFloat(input.value) * parseFloat(obj[t]);

  submit.onclick = () => {
    if(!input.value){
      warning.innerText = 'Plese Enter A Number';
      alertDiv.style.display = 'flex';
      setTimeout(()=>alertDiv.style.display = 'none', 1500);
      return;
    }else if(input.value <= 0){
      warning.innerText = 'Please Enter A Number Greater Then 0';
      alertDiv.style.display = 'flex';
      setTimeout(()=>alertDiv.style.display = 'none', 1500);
      return;
    }
    result.innerText = parseFloat(input.value) * parseFloat(nr);
  }

  from.onchange = () => {
    nr = obj[to.value] / obj[from.value];
  }

  to.onchange = () => {
    if(to.value === 'usd' && from.value === 'bdt'){
    	nr = obj[from.value] / obj[to.value];
    }else{
    	nr = obj[to.value] / obj[from.value];
    }
  }
}

api('usd', 'bdt');

