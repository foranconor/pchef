const ingredient = {
  name: 'flour',  // must be unique in data
  price: 20.1, // javascript number no fuss
  quantity: 20,
  unit: 'kg',  // just string
  from: [
    'Moore Wilsons',
    'New World'
  ]
}

const recipe = {
  name: 'bread',
  method: 'make bread',
  makes: 1, // allow recipe to be used as ingredient
  ingredients: [
    {
      name: 'flour',
      quantity: 1000,
      unit: 'g'
    },
    {
      name: 'yeast',
      quantity: 20,
      unit: 'g'
    }
  ]
}
