class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }

  build(fn) {
    return new Enumerable(this.collection.slice(), this.operations.concat(fn));
  }

  // BEGIN (write your solution here)
  where(...args) {


   return this.build((coll) => coll.filter(fn));
    
    
  }
  // END

  getProcessedCollection() {
    if (!this.memo) {
      this.memo = this.operations.reduce((acc, func) => func(acc), this.collection);
    }

    return this.memo;
  }

  get length() {
    return this.getProcessedCollection().length;
  }

  toArray() {
    return this.getProcessedCollection().slice();
  }
};

const cars = [
  { brand: 'bmw', model: 'm5', year: 2014 },
  { brand: 'bmw', model: 'm4', year: 2013 },
  { brand: 'kia', model: 'sorento', year: 2014 },
  { brand: 'kia', model: 'rio', year: 2010 },
  { brand: 'kia', model: 'sportage', year: 2012 },
];

const coll = new Enumerable(cars);
const result2 = coll.where(car => car.brand === 'kia', car => car.year > 2011).toArray();
console.table(result2)
