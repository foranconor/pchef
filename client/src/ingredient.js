import React from 'react';

const categories = [
  'Dry',
  'Chilled',
  'Frozen'
];

function Buttons(props) {
  return (
    <div className="btn-group btn-group-lg">
      <button className="btn btn-warning">Back</button>
      <button className="btn btn-warning">Save</button>
    </div>
  );
}

function Name(props) {
  return (
    <div className="form-group">
      <label htmlFor="ingr-name">Ingredient</label>
      <input
        className="form-control"
        type="text"
        id="ingr-name"
        value={props.ingredient.name}
        onChange={dothething} />
    </div>
  );
}

function dothething() {
  console.log('did it');
}

function Category(props) {
  const cat = props.ingredient.category;
  const opts = categories.map(c => <option key={c} value={c}>{c}</option>);
  return (
    <div className="form-group">
      <label htmlFor="ingr-category">Category</label>
      <select
        className="form-control"
        id="ingr-category"
        value={cat}
        onChange={dothething}>
        {opts}
      </select>
    </div>
  );
}

function From(props) {
  const ss = props.ingredient.from;
  const suppliers = ss.map(s => (
    <tr key={s.supplier}>
      <td>{s.supplier}</td>
      <td>{s.price}</td>
      <td>{s.quantity}</td>
      <td>{s.unit}</td>
    </tr>
  ));
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {suppliers}
        </tbody>
      </table>
      <AddRow />
    </div>
  );
}

function AddRow(props) {
  return (
    <button className="btn btn-warning">+</button>
  );
}

function Fields(props) {
  const i = props.ingredient;
  return (
    <form>
      <Name ingredient={i} />
      <Category ingredient={i} />
      <From ingredient={i} />
      <Buttons ingredient={i} />
    </form>
  );
}

export function EditIngredient(props) {
  return (
    <div className="container text-center">
      <Fields ingredient={props.ingredient} />
    </div>
  );
}
