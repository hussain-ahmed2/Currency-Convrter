const from = document.getElementById('from');
const to = document.getElementById('to');
const result = document.getElementById('result');
const input = document.getElementById('input');
const wait = document.getElementById('wait');
const submit = document.getElementById('submit');

const api = async (f, t) => {
  const res = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${f}.json`)
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

