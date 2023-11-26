elemGenerator(document.getElementById('main-login'), 1, 'form', 'id', 'login-frm')
elemGenerator(document.getElementById('login-frm0'), 2, 'input', 'id', 'login-frm-inp')
elemGenerator(document.getElementById('login-frm0'), 1, 'button', 'id', 'login-frm-btn')

let loginFrm = document.getElementById('login-frm0')
loginFrm.action = ''

let input1 = document.getElementById('login-frm-inp0')
input1.type = 'text'
input1.placeholder = 'Username...'
input1.focus()

let input2 = document.getElementById('login-frm-inp1')
input2.type = 'password'
input2.placeholder = 'Password...'


let subBtn = document.getElementById('login-frm-btn0')
subBtn.type = 'submit'
subBtn.textContent = 'Login'


loginFrm.addEventListener("submit", (e) =>{
  e.preventDefault()
  let logInput = document.getElementById('login-frm-inp0')
  let logPss = document.getElementById('login-frm-inp1')
  if(logInput.value == "" || logPss.value == ""){
    console.log("empty input ")
  } else {
    console.log(logPss.value)
    console.log(logInput.value)

    logInput.value = ''
    logPss.value = ''
    document.getElementById('main-div').textContent = "I am Logged I!"
  }
})
