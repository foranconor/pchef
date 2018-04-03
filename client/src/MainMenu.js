import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function go() {

}

function Button(props) {
  return (
    <button className='btn'>
      <Link to={'/' + props.name.toLowerCase()}>
        {props.name}
      </Link>
    </button>
  );
}

const items = [
  'Ingredients',
  'Suppliers',
  'Ordering',
  'Recipes',
  'Menus',
  'Rosters',
  'Diary'
]

export class MainMenu extends Component {
  render() {
    const btns = items.map(i => <Button key={i} name={i} />);
    return (
      <div className="container text-center">
        <h2 className="display-4">PChef</h2>
        <div className="btn-group-vertical btn-group-lg">
          {btns}
        </div>
      </div>
    );
  }
}
