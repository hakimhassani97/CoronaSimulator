class Population{
    constructor(position) {
        this.origin = position.copy()
        this.persons = []
    }
    fillPersons = ()=>{
        for(var i=0;i<maxPopulation;i++){
            this.persons.push(new Person())
        }
    }
    addPerson = ()=>{
        if(this.persons.length<maxPopulation){
            this.persons.push(new Person())
        }
    }
    run = ()=>{
        for (let i = this.persons.length - 1; i >= 0; i--) {
            let p = this.persons[i]
            p.run()
        }
    }
    totalInfected = ()=>{
        var total = 0
        // loop all the population
		for(var i=0;i<this.persons.length;i++){
            var person = population.persons[i]
            if(person.isSick) total++
        }
        return total
    }
}