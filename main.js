/**
 * 
 * @author hakimhassani97
 * https://github.com/hakimhassani97/CoronaSimulator
 */

let population // the population
var maxPopulation = 1000 // maximum number of persons
var sickPopulationPercentage = 1 // percentage of sick persons
var personsSpeed = 1 // person's speed
var personsRadius = 4 // person's radius (means the activity of person)
var totalInfected // total number of infected persons
var stayHome = false // self quarantine
var days = 0 // total days passed
var sicknessDays = 1 // total days for a sick person to recover

var stopAnimation = false

// handle window resize
window.addEventListener('resize',(e)=>{
    createCanvas(window.innerWidth * 3/5,window.innerHeight)
    Graph.setup()
})

function setup() {
    createCanvas(window.innerWidth * 3/5,window.innerHeight)
    population = new Population(createVector(width / 2, height / 2))
    population.fillPersons()
}

function draw() {
    background(51);
    // population.addPerson();
    population.run();
    drawStatistics()
    if(stopAnimation) noLoop()
}
function mouseClicked(){
    // population = new Population(createVector(mouseX, mouseY))
}
var oldTotal=-1
function drawStatistics(){
    totalInfected = population.totalInfected()
    noStroke()
    fill(255, 0, 0)
    textSize(20)
    text('Total infected :'+totalInfected+'/'+maxPopulation, 10, height-10)
    // push totalCasesGraph every 2 frames
    // if(frameCount%30==0){
    if(oldTotal!=totalInfected){
        totalCasesGraph.push(totalInfected)
        newInfected = totalCasesGraph.length>1 ? totalCasesGraph[totalCasesGraph.length-2] : 0
        newInfected = totalInfected - newInfected
        newCasesGraph.push(totalInfected- (totalCasesGraph[totalCasesGraph.length-15] || newInfected))
        oldTotal = totalInfected
    }
    if(frameCount%40==0) days++
    // stop when all contaminated
    if(totalInfected==maxPopulation) stopAnimation=true
}
// total cases graph
let totalCasesGraph=[]
let newCasesGraph=[]
var newInfected
let sketch = function(p) {
    // used as padding betwwen graphs
    var g1 = window.innerHeight/2,g2 = window.innerHeight
    p.setup = ()=>{
        p.createCanvas(window.innerWidth * 2/5,window.innerHeight)
    }
    p.draw = ()=>{
        p.background(51)
        p.drawTotalCasesGraph()
        p.drawNewCasesGraph()
        // draw stats
        p.drawStatistics()
        // draw dividers
        p.stroke(255)
        p.strokeWeight(2)
        p.line(0, 0, 0, g2)
        p.line(0, g1-2, p.width, g1-2)
        if(stopAnimation) p.noLoop()
    }
    p.drawTotalCasesGraph = ()=>{
        if(totalCasesGraph.length>p.width-50) totalCasesGraph.splice(0,1)
        var maxima = max(totalCasesGraph)
        for(var i=0;i<totalCasesGraph.length;i++){
            p.stroke(totalCasesGraph[i]/maxima*255,255-255*totalCasesGraph[i]/maxima,50)
            p.strokeWeight(p.width/maxPopulation)
            p.line(i,g1,i,g1-g1*totalCasesGraph[i]/maxima)
        }
    }
    p.drawNewCasesGraph = ()=>{
        if(newCasesGraph.length>p.width-50) newCasesGraph.splice(0,1)
        var maxima = max(newCasesGraph)
        for(var i=0;i<newCasesGraph.length;i++){
            p.stroke(newCasesGraph[i]/maxima*255,255-255*newCasesGraph[i]/maxima,50)
            p.line(i,g2,i,g2-g1*newCasesGraph[i]/maxima)
        }
    }
    p.drawStatistics = ()=>{
        // all cases
        p.fill(255)
        p.noStroke()
        p.textSize(13)
        p.text('total infected :'+(totalCasesGraph[totalCasesGraph.length-1] || 0),5,10)
        // new cases
        p.fill(255)
        p.noStroke()
        p.textSize(13)
        p.text('new cases :['+(newInfected || 0)+'] , max new cases :['+max(newCasesGraph)+'] , days :['+(days)+']',5,g1+10)
    }
}
let Graph = new p5(sketch)

// events
document.getElementById('radius').value = personsRadius
document.getElementById('radius').addEventListener('change',(e)=>{
    var newRadius = e.target.value
    if(newRadius>0)
        personsRadius = parseInt(newRadius)
})
document.getElementById('population').value = maxPopulation
document.getElementById('population').addEventListener('change',(e)=>{
    var newPopulation = e.target.value
    if(newPopulation>0)
        maxPopulation = parseInt(newPopulation)
})
document.getElementById('infection').value = sickPopulationPercentage
document.getElementById('infection').addEventListener('change',(e)=>{
    var newInf = e.target.value
    if(newInf>=0 && newInf<=100)
        sickPopulationPercentage = parseInt(newInf)
})
document.getElementById('home').addEventListener('change',(e)=>{
    var newStay = e.target.checked
    stayHome = newStay
})
document.getElementById('start').addEventListener('click',(e)=>{
    days = 0
    stopAnimation = false
    setup()
    loop()
    Graph.setup()
    Graph.loop()
    totalCasesGraph=[]
    newCasesGraph=[]
    newInfected=0
})