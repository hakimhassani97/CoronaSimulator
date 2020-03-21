let system;
window.addEventListener('resize',(e)=>{
    createCanvas(window.innerWidth,window.innerHeight-4)
})
function setup() {
    // createCanvas(720, 400);
    createCanvas(window.innerWidth,window.innerHeight-4)
    system = new ParticleSystem(createVector(width / 2, 50))
}

function draw() {
    background(51);
    system.addParticle();
    system.run();
}
function mouseClicked(){
    system = new ParticleSystem(createVector(mouseX, mouseY))
}