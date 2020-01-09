class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }

  build(fn) { return new Enumerable(this.collection.slice(), this.operations.concat(fn)); }

  select(fn) { return this.build((coll) => coll.map(fn)); }

  orderBy(fn, direction = 'asc') {
    const comparator = (a, b) => {
      const a1 = fn(a);
      const b1 = fn(b);

      const compareResult = direction === 'asc' ? 1 : -1;

      if (a1 > b1) { return compareResult; }

      if (a1 < b1) { return -compareResult; }

      return 0;
    };
    return this.build((coll) => coll.sort(comparator));
  }

  where(fn) { return this.build((coll) => coll.filter(fn)); }

  // BEGIN (write your solution here)

  toArray() {
    if (!this.memo) {
      for (const i of this.operations) {
        this.collection = i(this.collection);
      }
      this.memo = [...this.collection];
    }
    return this.collection;
  }

  get length() {
    return this.toArray().length;
  }

  // END
}


const cars = [
  { brand: 'bmw', model: 'm5', year: 2014 },
  { brand: 'bmw', model: 'm4', year: 2013 },
  { brand: 'kia', model: 'sorento', year: 2014 },
  { brand: 'kia', model: 'rio', year: 2010 },
  { brand: 'kia', model: 'sportage', year: 2012 },
];

const coll = new Enumerable(cars);
console.log(coll.toArray())



// coll.orderBy((car) => car.year, 'asc').toArray()
// const result = coll.where((car) => car.brand === 'kia').where((car) => car.year > 2011);
// const result = coll.orderBy((car) => car.year)
//       .where((car) => car.brand === 'kia')
//       .select((car) => car.model).toArray();
