const cars = [
  { brand: 'bmw', model: 'm5', year: 2014 },
  { brand: 'bmw', model: 'm4', year: 2013 },
  { brand: 'kia', model: 'sorento', year: 2014 },
  { brand: 'kia', model: 'rio', year: 2010 },
  { brand: 'kia', model: 'sportage', year: 2012 },
];

class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }

  select(fn) {
    const newOps = this.operations.slice();
    newOps.push(coll => coll.map(fn));
    return new Enumerable(this.collection.slice(), newOps);
  }

  orderBy(fn, dir = 'asc') {
    const ordered = this.collection.slice()
    .sort((a, b) => {
      if ((dir === 'desc' && fn(a) >= fn(b)) || (dir === 'asc' && fn(a) < fn(b))) {
        return -1;
      }
      return fn(a) - fn(b);
    });
    return new Enumerable(ordered);
  }

  where(fn) {
    const filtered = this.collection.filter(fn);
    return new Enumerable(filtered);
  }

  toArray() {
    return this.collection;
  }
}


const coll = new Enumerable(cars);

console.dir(coll.orderBy(car => car.brand === 'kia', 'asc').where(car =>  car.year === 2010));

// const result = coll.orderBy(car => car.year, 'desc')
//   .where(car => car.brand === 'kia')
//   .select(car => car.model)
//   .toArray();
