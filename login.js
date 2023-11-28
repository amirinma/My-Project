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

// Carousel or lightbox data
  let lightboxTitle = 'My Stock Overview'
  let imgFiles = ['crypto-two.jpg', 'crypto-three.jpg', 'crypto-four.jpg', 'crypto-five.jpg']
  let imgCount = imgFiles.length
  let imgCaptions = new Array(2)
  imgCaptions[0] = 'Crypto Two'
  imgCaptions[1] = 'Crypto Three'
  imgCaptions[2] = 'Crypto Four'
  imgCaptions[3] = 'Crypto Five'

  let node = document.getElementById('carousel')




  if(logInput.value == "" || logPss.value == ""){
    console.log("empty input ")
  } else {
    console.log(logPss.value)
    console.log(logInput.value)

    logInput.value = ''
    logPss.value = ''
    // document.getElementById('main-div').textContent = "I am Logged I!"
      let loginDiv = document.querySelector('#main-login')
      loginDiv.style.display = 'none'

    // lightBox container
    let lightBox = document.getElementById('carousel')
    // parts of the lightBox
    let lbTitle = document.createElement("h1");
    let lbCounter = document.createElement("div");
    let lbPrev = document.createElement("div");
    let lbNext = document.createElement("div");
    let lbPlay = document.createElement("div");
    let lbImages = document.createElement("div");

    // design the lightbox title
    lightBox.appendChild(lbTitle);
    lbTitle.id = "lbTitle";
    lbTitle.textContent = lightboxTitle;

    //design the light box slide counter
    lightBox.appendChild(lbCounter);
    lbCounter.id = "lbCounter";
    let currentImg = 1;
    lbCounter.textContent = currentImg + " / " + imgCount;

    //design the lightbox previous slide button
    lightBox.appendChild(lbPrev);
    lbPrev.id = "lbPrev";
    lbPrev.innerHTML = "&#9664";
    lbPrev.onclick = showPrev;
    //design the light box next slide button
    lightBox.appendChild(lbNext);
    lbNext.id = "lbNext";
    lbNext.innerHTML = "&#9654"
    lbNext.onclick = showNext;
    //design the lightbox play-pause button
    lightBox.appendChild(lbPlay);
    lbPlay.id = "lbPlay";
    lbPlay.innerHTML = "&#9199"
    let timeID;
    lbPlay.onclick = function (){
      if (timeID){
        window.clearInterval(timeID);
        timeID = undefined;
      } else {
        showNext();
        timeID = window.setInterval(showNext, 1500);
      }
    }

    //design the lightbox images container
    lightBox.appendChild(lbImages);
    lbImages.id = "lbImages";
    //add images from the imgFiles array to the container
    for (let i = 0; i < imgCount; i++){
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.classList.add('carousel-pic')
      // image.onclick = createOverlay;
      lbImages.appendChild(image);

    }
    lbImages.firstElementChild.classList.remove('carousel-pic')

    //function to move forward through the images list
    function showNext(){
      lbImages.appendChild(lbImages.firstElementChild);
      (currentImg < imgCount)? currentImg ++ : currentImg = 1;
      lbImages.lastElementChild.classList.add('carousel-pic')
      lbImages.firstElementChild.classList.remove('carousel-pic')

      lbCounter.textContent = currentImg + " / " + imgCount;
    }
    //function to move backward through the images list
    function showPrev(){
      lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
      (currentImg > 1) ? currentImg -- : currentImg = imgCount;

      lbImages.firstElementChild.nextElementSibling.classList.add('carousel-pic')
      lbImages.firstElementChild.classList.remove('carousel-pic')

      // lbImages.
      lbCounter.textContent = currentImg + " / " + imgCount;
    }




  }
})
