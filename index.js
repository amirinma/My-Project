document.querySelector('body').appendChild(document.createElement('div')).setAttribute('id','main-div')
let mainDiv = document.getElementById('main-div');
elemGenerator(mainDiv, 5, 'div', 'class', 'main-dv-child');
let mainChild = document.querySelectorAll('.main-dv-child');

let elementId = 0
mainChild.forEach(function (item){
  elementId ++;
  item.setAttribute('id', `${item.getAttribute('class')+elementId}`)
})

const mainChildFirstEl = document.getElementById('main-dv-child1')
elemGenerator(mainChildFirstEl, 2, 'div', 'class', 'main-child1-div')

// for(let item of mainChildFirstEl){
//   elementId ++
//   console.log(item)
// }

console.log(mainChildFirstEl)
function elemGenerator(parEl, quanEl, typeEl, attrName, attrVal){
  for(let i = 0; i< quanEl; i++){
    let elem =parEl.appendChild(document.createElement(`${typeEl}`)).setAttribute(`${attrName}`, `${attrName === "id" ? attrVal+[i] : attrVal}`)
    console.log('hi')
  }
}
