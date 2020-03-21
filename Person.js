// A simple Person class
class Person {
	constructor(){
		this.acceleration = createVector(0, 0.05)
		this.velocity = createVector(random(-personsSpeed, personsSpeed), random(-personsSpeed, personsSpeed))
		this.position = createVector(ceil(random(personsRadius, width-personsRadius)), ceil(random(personsRadius, height-personsRadius)))
		this.isSick = random(0,1)<sickPopulationPercentage/100 ? true : false
		if(this.isSick) this.sickness = sicknessDays * 40
	}
	run = ()=>{
		this.update()
		this.checkCollisionAll()
		this.display()
	}
	// Method to update position
	update = ()=>{
		if(this.isSick) {
			this.sickness-=1
			if(this.sickness<0) this.isSick=false
		}
		if(stayHome && random(0,1)>0.1) return
		// create a new vector every 120 frames to rotate the person
		if(frameCount%ceil(random(0,120))==0){
			this.velocity = createVector(ceil(random(-personsSpeed-1, personsSpeed)), ceil(random(-personsSpeed-1, personsSpeed)))
		}
		this.position.add(this.velocity)
		// check if person in the edge
		if(this.isInEdge()){
			// reverse person's direction
			this.velocity = createVector(-this.velocity.x, -this.velocity.y)
			this.position.add(this.velocity)
		}
	}
	// Method to display
	display = ()=>{
		stroke(this.isSick ? 200 : 0, this.isSick ? 0 : 200, 0)
		strokeWeight(2)
		fill(this.isSick ? 127 : 0, this.isSick ? 0 : 127, 0)
		ellipse(this.position.x, this.position.y, personsRadius, personsRadius)
	}
	// check collision with one
	checkCollisionOne = (person)=>{
		return this.position.x>=person.position.x-personsRadius && this.position.x<=person.position.x+personsRadius
			&& this.position.y>=person.position.y-personsRadius && this.position.y<=person.position.y+personsRadius
	}
	// check collision with the others
	checkCollisionAll = ()=>{
		// loop all the population
		for(var i=0;i<population.persons.length;i++){
			var person = population.persons[i]
			// theres a collision
			if(this.checkCollisionOne(person)){
				// contaminate this person
				if(!this.isSick && person.isSick){
					this.isSick = true
					this.sickness = sicknessDays * 40
				}
			}
		}
	}
	// Is the person in the edge
	isInEdge = ()=>{
		return this.position.x<personsRadius || this.position.y<personsRadius || this.position.x>width-personsRadius || this.position.y>height-personsRadius
	}
}