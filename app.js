// Variables
const currencyForm          = document.querySelector('#currencyForm'),
      fromSelect            = document.querySelector('#from'),
      fromInput             = document.querySelector('#fromCurrency'),
      fromCountry           = document.querySelector('#fromCountry'),
      toSelect              = document.querySelector('#toCurrencyOpt'),
      toCurrencyInput       = document.querySelector('#toCurrency'),
      toCountry             = document.querySelector('#toCountry'),
      swapBtn               = document.querySelector('#swap'),
      myAppKey              = '906651ba2b676b4d1533';
   
async function getCurId(){
    const response = await fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${myAppKey}`);

    const data = await response.json();
    return data;
}

getCurId()
    .then(data => data.results)
    .then(res => {
        let outputID = '';
        Object.values(res).forEach(cur => outputID += `<option>${cur.id}</option>`);

        fromSelect.innerHTML    = outputID;
        toSelect.innerHTML      = outputID;
    })
    .catch(err => console.log(err));

async function getCountryName(){
    const response = await fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${myAppKey}`);

    const data = await response.json();
    return data;
}

currencyForm.addEventListener('change', () => {
    getCountryName()
        .then(res => res.results)
        .then(data => {
            let fromCurName = '';
            let toCurName   = '';
            Object.values(data).forEach(cur => {
                if(cur.id === fromSelect.value){
                    fromCurName = cur.currencyName;
                }

                if(cur.id === toSelect.value){
                    toCurName = cur.currencyName;
                }
            });
            fromCountry.innerHTML = `from <strong>${fromCurName}</strong>`;
            toCountry.innerHTML   = `to <strong>${toCurName}</strong>`;
        })
        .catch(err => console.log(err));
});

async function getCurVal(){
    fromValue = fromSelect.value;
    toValue = toSelect.value;
    
    const responseVal = await fetch(`https://free.currconv.com/api/v7/convert?q=${fromValue}_${toValue}&compact=ultra&apiKey=${myAppKey}`);
    
    const data = await responseVal.json();    
    return data;
}

currencyForm.addEventListener('keyup', e => {
    getCurVal()
        .then(res => res)
        .then(data => {
            Object.values(data).forEach(cur => {
                const valToTransform = parseInt(fromInput.value);
                const transformedCur = valToTransform * cur;

                if(isNaN(transformedCur)){
                    toCurrencyInput.textContent = '0.00'
                } else {
                    toCurrencyInput.textContent = transformedCur.toFixed(2);
                }
            });
        })
        .catch(err => console.log(err));
    
    e.preventDefault();
});
