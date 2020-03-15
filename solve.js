var apiKey = {key: '3de9edd0-1481-49e2-ada5-d258adde9e5c'}
let tbody = document.querySelector('tbody');
let data = []
function solve(str, end){
    request('GET', 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + apiKey.key)
    .then((res) => {
        let xRes = JSON.parse(res.target.responseText) 
        let da = xRes.data
        da = da.slice(str, end)
        data = Array.from(da)
        // console.log(Array.from(da));
    })
    .then(() => {
        for(let el of data){
            let tr = document.createElement('tr');
            let s = document.createElement('td')
            s.textContent = el.symbol;
            let n = document.createElement('td');
            n.textContent = el.name;
            let b = document.createElement('td');
            b.textContent = el.quote.USD.price;
            let e = document.createElement('td');
            e.textContent = Number(el.quote.USD.price) * 0.901364;
            let bgn = document.createElement('td');
            bgn.textContent = Number(el.quote.USD.price) * 1.75;
            tr.append(s, n, b, e, bgn);
            tbody.append(tr);
          }
    })
    .catch(err => console.error(err))
}  
    solve(0, 10)
    let nEnd = 10
    let nStr = 0
    let allLi = Array.from(document.getElementsByTagName('li'));
      allLi.map(x => x.addEventListener('click', (e) => {
      allLi.map(y => y.classList.remove('ttt'))
      sessionStorage.setItem('sim', nStr)
      if(e.target.textContent === 'prev'){
        let simValue = sessionStorage.getItem('sim')
        nStr = Number(simValue) - 10
        nStr = nStr < 0 ? 0 : nStr
        nEnd = nStr + 10
        let n = nEnd.toString()[0]
        document.querySelector(`body > div.pagination > ul > li:nth-child(${+n + 1})`).classList.add('ttt')
      }
      else if(e.target.textContent === 'next'){
        let simValue = sessionStorage.getItem('sim')
        nStr = Number(simValue) + 10
        nStr = nStr > 90 ? 90 : nStr
        nEnd = nStr + 10
        let n = nEnd <= 90 ? nEnd.toString()[0] : 10
        document.querySelector(`body > div.pagination > ul > li:nth-child(${+n + 1})`).classList.add('ttt')
      }
      else{
      e.target.classList.add('ttt')
      nEnd = Number(e.target.textContent) * 10
      nStr = nEnd - 10
      }
      document.querySelector('tbody').innerHTML = ''
      solve(nStr, nEnd)
      sessionStorage.setItem('sim', nStr + 10)
    }))
    
    document.querySelector('tbody').addEventListener('click', (ev) => {
      let parent = ev.target.parentElement
      let name = parent.querySelectorAll('td')[1].textContent
      name = name.toLowerCase()
      if(name.indexOf(' ') !== -1){
        name = name.split(' ')
        name = name.join('-')
      }
      let urls = `https://coinmarketcap.com/currencies/${name}`
      window.open(urls,'_blank');
    })
    
    
    function request(method, url){
        return new Promise(function (res, rej){
            var xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.onload = res
            xhr.onerror = rej
            xhr.send()
        })
    }
