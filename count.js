"use strict";

//The Firework gonna come out once the countdown is finished or in other words, "Birthday Time". And you also can adjust the countdown time.

"use strict";

const mainContainer = document.querySelector('.container-content')
const button = document.querySelector(".my-button");
const happyContainer = document.querySelector('.happy__content'); 
const countdownContainer = document.querySelector('.countdown__content'); 
const settingIcon = document.querySelector('.setting-icon');
const modalbox = document.querySelector('.content-modalbox');
const birthdayInput = document.querySelector('.birthday__input');
const submitBtn = document.querySelector('.submit-btn__input--style');
const day = document.querySelector('.days');
const hour = document.querySelector('.hours');
const minute = document.querySelector('.minutes');
const second = document.querySelector('.seconds');
const audio = document.querySelector("audio");

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];


/**Important Variable */
const d = new Date();
const oneYearFromNow = new Date(d.setFullYear(d.getFullYear() + 1));

let birthday = '';

checkPastOrFuture('23', 'February');

function submitDate(e){

  let year, str;
  if(birthdayInput.value !== ''){
     str = birthdayInput.value.split(' ');
    if( isNaN(str[0] - 0) && str[0] > 31){
      alert('You have to insert with format like this "Date Month Year". Exp : 20 July 1998');
  
      return;
    }else if(!months.includes(str[1].toLowerCase())){
        alert('You have to insert right month and write it in english!')
  
        return;
    }

  }else{
    alert('You have to insert date!!')
    return;
  }


    checkPastOrFuture(str[0], str[1]);

    modalbox.style.display = 'none';
    


}

modalbox.addEventListener('keyup', e =>{
  if(e.key === 'Enter'){
    submitDate();
  } 

  console.log(e.key);
})
submitBtn.addEventListener('click', submitDate)



let distanceOfTime;

let interval = setInterval(() => {

  const date = new Date(birthday),
        seconds = 1000,
        minutes = seconds * 60,
        hours = minutes * 60,
        days = hours * 24;
  
  // console.log(date);
  
  let countDown = date.getTime();
  let now = new Date().getTime();
    
  distanceOfTime =   countDown - now;
    

    day.textContent = Math.floor(distanceOfTime /  (days))
    hour.textContent = Math.floor((distanceOfTime %  (days))  / (hours));
    minute.textContent = Math.floor((distanceOfTime %  (hours))  / (minutes));
    second.textContent = Math.floor((distanceOfTime %  (minutes))  / (seconds));

    // console.log(birthday);


    if(distanceOfTime < 0){

      countdownContainer.style.display = 'none';
      mainContainer.style.display = 'none';
      happyContainer.style.display = 'block';
      // Programmatically trigger the click event
    
      button.addEventListener("click", function() {
        audio.play();
      });

      button.dispatchEvent(new Event("click"));

      

    }else{
      countdownContainer.style.display = 'block';
      mainContainer.style.display = 'block';
      happyContainer.style.display = 'none';
    }

    
}, 0);



settingIcon.addEventListener("change", () =>{
  const styleModalbox = getComputedStyle(modalbox);
   
  (styleModalbox.display === 'none') ? modalbox.style.display  = "flex" : modalbox.style.display  = "none";

  birthdayInput.focus()
  

  
})




/**Utils */
function checkPastOrFuture(date, month, year){
  const data = new Date(date + ' ' +  month + ' ' + new Date().getFullYear()).setHours(0, 0, 0, 0);

  const now = new Date().setHours(0, 0, 0, 0);

  const lastDateInThisYear = new Date('31 December' + new Date().getFullYear());

  console.log(date + ' ' +  month + ' ' + new Date().getFullYear())
  console.log(new Date(date + ' ' +  month + ' ' + new Date().getFullYear()))

  if(data  < now){
    console.log('past')
    birthday = `${date} ${month} ${oneYearFromNow.getFullYear()} 00:00:00`;
    // subline.textContent =  `From this day until ${date} ${month} ${oneYearFromNow.getFullYear()}`;

    
  }else if(data <= lastDateInThisYear){
    console.log('_______________________________')
    console.log('not until last date')
    birthday = `${date} ${month} ${new Date().getFullYear()} 00:00:00`;
  }
}



/**Canvas Functionality*/

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight



const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']


addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})



const gravity = 0.01;
const friction = 0.99;

// Particles
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    c.save()
    c.globalAlpha = this.alpha;
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore();
  }

  update() {
    this.draw()
    this.velocity.y *= friction;
    this.velocity.x *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.005;
  }
}

let projectiles = [];
let acceleration = 1.015;
class Firework{
  constructor(x, y, radius,  color, velocity){
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;

  }

  draw(){
      c.beginPath();
      c.arc(this.x, this.y, this.radius, Math.PI*0, Math.PI*2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();

  }

  update() {
      this.draw();
      this.x +=  this.velocity.x * acceleration;
      this.y +=   this.velocity.y * acceleration;
      // this.velocity.x *= acceleration;
      // this.velocity.y *= acceleration;

  }

}



// Implementation
let particles;
function init() {
  particles = []

 
}


// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(0, 0, 0, 0.05)`
  c.fillRect(0, 0, canvas.width, canvas.height)
  // ctx.clearRect(0,0,canvas.width, canvas.height);
  particles.forEach((particle, i) => {
   
    if(particle.alpha > 0){
      particle.update()
    }else{
      particles.splice(i, 1)
    }

  })

}

init()
animate()

setInterval(() =>{

  if(distanceOfTime < 0){

    c.font = "40px Arial";
    
    // Set a gradient fill for the text
    var gradient = c.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(1, "blue");
    c.fillStyle = gradient;
    
    c.textAlign = "center";
    c.textBaseline = "middle";
    
    c.fillText("Happy birthday meri beti, meri jaan!", canvas.width/2, canvas.height/2);
 
    let x, y;

    if(innerWidth <= 768){
       x = randomIntFromRange(50, innerWidth - 50)
       y =  randomIntFromRange(25, innerHeight - 25)
      
    }else{
       x = randomIntFromRange(200, innerWidth - 200)
       y =  randomIntFromRange(50, innerHeight - 100)
      
    }
    const particleCount = 100;
    const angleIncrement = (Math.PI * 2) / particleCount;
    const power = 7;

    // console.log(Math.cos(angleIncrement * 32));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(x, y, 5, `hsl(${Math.random() * 360}, 50%, 50%)`, {
        x:Math.cos(angleIncrement * i) * Math.random() * power,
        y:Math.sin(angleIncrement * i) * Math.random() * power,
      }));
      // console.log(Math.cos(angleIncrement * i));
    }
  }
}, 2000)


/**Utils */
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  
  function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
  }
  



// addEventListener('click', (e)=>{
