//=========================================================== Creating Nav Bar

  elemGenerator(document.getElementById('top-nav'), 4, 'a', 'id', 'top-nav-' )
  let navOne =document.getElementById('top-nav-0')
  navOne.textContent = 'Home'
  let navTwo =document.getElementById('top-nav-1')
  navTwo.textContent = 'Trade'
  let navThree =document.getElementById('top-nav-2')
  navThree.textContent = 'Feed'
  let navFour =document.getElementById('top-nav-3')
  navFour.textContent = 'Inquiry'



//=========================================================== Creating Nav Bar
document.querySelector('body').appendChild(document.createElement('div')).setAttribute('id', 'main-div')
let mainDiv = document.getElementById('main-div');
elemGenerator(mainDiv, 5, 'div', 'class', 'main-dv-child');
let mainChild = document.querySelectorAll('.main-dv-child');

let elementId = 0
mainChild.forEach(function(item) {
  elementId++;
  item.setAttribute('id', `${item.getAttribute('class') + elementId}`)
})

const mainChildFirstEl = document.getElementById('main-dv-child1')
elemGenerator(mainChildFirstEl, 2, 'div', 'class', 'main-child1-div')

// for(let item of mainChildFirstEl){
//   elementId ++
//   console.log(item)
// }

mainChildFirstEl.childNodes.forEach(function(item) {
  elementId++;
  item.setAttribute('id', `${item.getAttribute('class') + elementId}`)
})

const leftHead = document.getElementById('main-child1-div6')
leftHead.textContent = 'ProTraders';
const rightHead = document.getElementById('main-child1-div7');
rightHead.textContent = 'Login/Logout';

//================================================================= inside page nav buttons
const mainChildThirdEl = document.getElementById('main-dv-child3');
//mainChildThirdEl.appendChild(document.createElement('div')).setAttribute('id', 'container1')
elemGenerator(mainChildThirdEl, 3, 'div', 'id', 'container');
elemGenerator(document.getElementById('container0'), 4, 'button', 'id', 'nav-btn');

let navBtn1 = document.getElementById('nav-btn0')
navBtn1.textContent = 'Chart'
navBtn1.onclick = function (){
  let cont1 = document.getElementById('container1')
  cont1.style.display = 'block'
  let cont2 = document.getElementById('container2')
  cont2.style.display = 'block'
  let cont3 = document.getElementById('portf-dv')
  cont3.style.display = 'none'
}
let navBtn2 = document.getElementById('nav-btn1')
navBtn2.textContent = 'Portfolio'
navBtn2.onclick = function (){
  let cont1 = document.getElementById('container1')
  cont1.style.display = 'none'
  let cont2 = document.getElementById('container2')
  cont2.style.display = 'none'
  let portfolio = document.getElementById('main-dv-child3')
    portfolio.appendChild(document.createElement('div')).setAttribute('id', 'portf-dv')
}
let navBtn3 = document.getElementById('nav-btn2')
navBtn3.textContent = 'Chart1'
let navBtn4 = document.getElementById('nav-btn3')
navBtn4.textContent = 'Chart2'
let insideNav = document.getElementById('container0')
for (let item of insideNav.children){
  item.setAttribute('class', 'ins-nav-btn')
}
//====================================================== transaction form  > order > sell
elemGenerator(document.getElementById('container2'), 1, 'form', 'id', 'transaction-frm')
let transFrm = document.getElementById('transaction-frm0');

transFrm.appendChild(document.createElement('label')).setAttribute('id', 'trans-frm-lbl1')
let lableOne = document.getElementById('trans-frm-lbl1')
lableOne.textContent = "Symbol: "
transFrm.appendChild(document.createElement('input')).setAttribute('id', 'trans-frm-inp1')
let inputOne = document.getElementById('trans-frm-inp1')
inputOne.type = 'text'

transFrm.appendChild(document.createElement('label')).setAttribute('id', 'trans-frm-lbl2')
let lableTwo = document.getElementById('trans-frm-lbl2')
lableTwo.textContent = "Price: "
transFrm.appendChild(document.createElement('input')).setAttribute('id', 'trans-frm-inp2')
let inputTwo = document.getElementById('trans-frm-inp2')
inputTwo.type = 'text'

transFrm.appendChild(document.createElement('label')).setAttribute('id', 'trans-frm-lbl3')
let lableThree = document.getElementById('trans-frm-lbl3')
lableThree.textContent = "Quantity: "
transFrm.appendChild(document.createElement('input')).setAttribute('id', 'trans-frm-inp3')
let inputThree = document.getElementById('trans-frm-inp3')
inputThree.type = 'text'

transFrm.appendChild(document.createElement('button')).setAttribute('id', 'trans-frm-btn1')
let btnOne = document.getElementById('trans-frm-btn1')
btnOne.textContent = 'Buy'
btnOne.type = 'submit'

transFrm.appendChild(document.createElement('button')).setAttribute('id', 'trans-frm-btn2')
let btnTwo = document.getElementById('trans-frm-btn2')
btnTwo.textContent = 'Sell'
btnTwo.type = 'submit'

//=================================
// presenting the chart
let p = window.onload = function () {
  var dps1 = [], dps2= [];
  var stockChart = new CanvasJS.StockChart("container1",{
    title:{
      text:"Stock Chart"
    },
    subtitles: [{
      text:"Simple Moving Average"
    }],
    charts: [{
      axisY: {
        prefix: "$"
      },
      legend: {
        verticalAlign: "top",
        cursor: "pointer",
        itemclick: function (e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "candlestick",
        showInLegend: true,
        name: "Stock Price",
        yValueFormatString: "$#,###.00",
        xValueType: "dateTime",
        dataPoints : dps1
      }],
    }],
    navigator: {
      data: [{
        dataPoints: dps2
      }],
      slider: {
        minimum: new Date(2018, 03, 01),
        maximum: new Date(2018, 05, 01)
      }
    }
  });
  $.getJSON("https://canvasjs.com/data/docs/ethusd2018.json", function(data) {
    for(var i = 0; i < data.length; i++){
      dps1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});
      dps2.push({x: new Date(data[i].date), y: Number(data[i].close)});
    }
    stockChart.render();
    var sma = calculateSMA(dps1, 7);
    stockChart.charts[0].addTo("data", { type: "line", dataPoints: sma, showInLegend: true, yValueFormatString: "$#,###.00", name: "Simple Moving Average"})
  });
  function calculateSMA(dps, count){
    var avg = function(dps){
      var sum = 0, count = 0, val;
      for (var i = 0; i < dps.length; i++) {
        val = dps[i].y[3]; sum += val; count++;
      }
      return sum / count;
    };
    var result = [], val;
    count = count || 5;
    for (var i=0; i < count; i++)
      result.push({ x: dps[i].x , y: null});
    for (var i=count - 1, len=dps.length; i < len; i++){
      val = avg(dps.slice(i - count + 1, i));
      if (isNaN(val))
        result.push({ x: dps[i].x, y: null});
      else
        result.push({ x: dps[i].x, y: val});
    }
    return result;
  }
}

//========================================= Represent chart based on search input
function searchTickerFu(tick) {
  var dps1 = [], dps2= [];
  var stockChart = new CanvasJS.StockChart("container1",{
    title:{
      text:"Stock Charty"
    },
    subtitles: [{
      text:"Simple Moving Average"
    }],
    charts: [{
      axisY: {
        prefix: "$"
      },
      legend: {
        verticalAlign: "top",
        cursor: "pointer",
        itemclick: function (e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "candlestick",
        showInLegend: true,
        name: "Stock Price",
        yValueFormatString: "$#,###.00",
        xValueType: "dateTime",
        dataPoints : dps1
      }],
    }],
    navigator: {
      data: [{
        dataPoints: dps2
      }],
      slider: {
        minimum: new Date(2018, 03, 01),
        maximum: new Date(2018, 05, 01)
      }
    }
  });
  $.getJSON(`https://canvasjs.com/data/docs/${tick}usd2018.json`, function(data) {
    for(var i = 0; i < data.length; i++){
      dps1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});
      dps2.push({x: new Date(data[i].date), y: Number(data[i].close)});
    }
    stockChart.render();
    var sma = calculateSMA(dps1, 7);
    stockChart.charts[0].addTo("data", { type: "line", dataPoints: sma, showInLegend: true, yValueFormatString: "$#,###.00", name: "Simple Moving Average"})
  });
  function calculateSMA(dps, count){
    var avg = function(dps){
      var sum = 0, count = 0, val;
      for (var i = 0; i < dps.length; i++) {
        val = dps[i].y[3]; sum += val; count++;
      }
      return sum / count;
    };
    var result = [], val;
    count = count || 5;
    for (var i=0; i < count; i++)
      result.push({ x: dps[i].x , y: null});
    for (var i=count - 1, len=dps.length; i < len; i++){
      val = avg(dps.slice(i - count + 1, i));
      if (isNaN(val))
        result.push({ x: dps[i].x, y: null});
      else
        result.push({ x: dps[i].x, y: val});
    }
    return result;
  }
}
//=========================================


//====================================================================== Child 2, search content
elemGenerator(document.getElementById('main-dv-child2'),2, 'div', 'id', 'main-ch2-dv')
console.log(document.getElementById('main-dv-child2').children)
for (let item of document.getElementById('main-dv-child2').children){
  item.setAttribute('class', 'mn-dv2-child')
}
//====================================================================== Creating search input
let ticker = 'BTC'
document.getElementById('main-ch2-dv0').textContent = ticker
document.getElementById('main-ch2-dv1').appendChild(document.createElement('form')).setAttribute('id', 'search-frm')
let searchFrm = document.getElementById('search-frm')

searchFrm.appendChild(document.createElement('label')).textContent = 'Look Up  '
searchFrm.appendChild(document.createElement('input')).setAttribute('id', 'search-input')
let searchFrmInput = document.getElementById('search-input')
  searchFrmInput.type = 'text'
searchFrmInput.placeholder = 'BTC'
searchFrmInput.addEventListener('keydown', function (e){

  console.log("Search Pressed!")
  if (e.key === 'Enter'){
    e.preventDefault()
    if (searchFrmInput.value !== ""){
      searchTickerFu(searchFrmInput.value)
      searchFrmInput.value = ''
    }
  }
})

let test = document.getElementById('main-dv-child5')
console.log(test)
// creates child elements
function elemGenerator(parEl, quanEl, typeEl, attrName, attrVal) {
  for (let i = 0; i < quanEl; i++) {
    let elem = parEl.appendChild(document.createElement(`${typeEl}`)).setAttribute(`${attrName}`, `${attrName === "id" ? attrVal + [i] : attrVal}`)
    console.log('hi')
  }
}


