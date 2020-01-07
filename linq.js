const  cars = [
  {brand: 'bmw', model: 'm5', year: 2014},
  {brand: 'bmw', model: 'm4', year: 2013},
  {brand: 'kia', model: 'sorento', year: 2014},
  {brand: 'kia', model: 'rio', year: 2010},
  {brand: 'kia', model: 'sportage', year: 2012},
];


const coll = HehletLinq.from(cars);

const result = coll.orderBy(car => car.year, 'desc')
.where(car => car.brand === 'kia')
.select(car => car.model).toArray();
