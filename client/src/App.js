import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { MainMenu } from './MainMenu.js';
import { ResourceList } from './resource';
import { EditIngredient } from './ingredient';
import { EditRecipe } from './recipe';
import 'bootstrap/dist/css/bootstrap.css';

const fr = [
  {
    supplier: 'Moore Wilsons',
    price: 20.5,
    quantity: 20,
    unit: 'kg'
  }
]

const ingredients = [
  {
    name: 'flour',
    category: 'dry',
    from: []
  },
  {
    name: 'yeast',
    category: 'Chilled',
    from: fr
  },
  {
    name: 'sugar',
    category: 'dry',
    from: []
  },
  {
    name: 'salt',
    category: 'dry',
    from: []
  },
  {
    name: 'butter',
    category: 'dairy',
    from: []
  },
  {
    name: 'milk',
    category: 'dairy',
    from: []
  }
];

const recipes = [
  {
    name: 'Milk Rolls',
    ingredients: [
      {
        name: 'yeast',
        quantity: 115,
        unit: 'g'
      },
      {
        name: 'flour',
        quantity: 1650,
        unit: 'g'
      },
      {
        name: 'milk',
        quantity: 690,
        unit: 'ml'
      },
      {
        name: 'sugar',
        quantity: 115,
        unit: 'g'
      },
      {
        name: 'salt',
        quantity: 45,
        unit: 'g'
      },
      {
        name: 'butter',
        quantity: 225,
        unit: 'g'
      }
    ],
    method: 'make dough, bake bread',
    quantity: 48,
    unit: 'rolls'
  }
];



class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={MainMenu} />
        <Route
          path='/ingredients'
          render={
            () => <ResourceList resource="Ingredient" data={ingredients} />
          }
        />
        <Route
          path='/recipes'
          render={
            () => <ResourceList resource="Recipe" data={recipes} />
          }
        />
        <Route
          path='/yeast'
          render={
            () => <EditIngredient ingredient={ingredients[1]} />
          }
        />

      </Switch>
    );
  }
}

export default App;
