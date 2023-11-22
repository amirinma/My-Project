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


const mainChildThirdEl = document.getElementById('main-dv-child3');
mainChildThirdEl.appendChild(document.createElement('div')).setAttribute('id', 'container1')
// mainChildThirdEl.childNodes.forEach(function(item) {
//   elementId++;
//   item.setAttribute('id', `${item.getAttribute('class') + elementId}`)

// })
//============================
const isElementLoaded = async selector => {
  while ( document.querySelector(selector) === null) {
    await new Promise( resolve => requestAnimationFrame(resolve) )
  }
  return document.querySelector(selector);
};

// I'm checking for a specific class .file-item and then running code. You can also check for an id or an element.
isElementLoaded('#container').then((selector) => {
  let cloneChart = document.getElementById('container').cloneNode(true);
  document.getElementById('container1').appendChild(cloneChart);
});
//=================================
// presenting the chart
window.onload = function () {
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
// Fetching open and close price
async function getData(){
  const res = await fetch('https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?adjusted=true&sort=asc&limit=120&apiKey=OFq3eK3caAqNsWB33pQfQwVtTygClgup')
  const data = await res.json()
  console.log('I am running')
  console.log(data)
}
getData();


// creates child elements
function elemGenerator(parEl, quanEl, typeEl, attrName, attrVal) {
  for (let i = 0; i < quanEl; i++) {
    let elem = parEl.appendChild(document.createElement(`${typeEl}`)).setAttribute(`${attrName}`, `${attrName === "id" ? attrVal + [i] : attrVal}`)
    console.log('hi')
  }
}
