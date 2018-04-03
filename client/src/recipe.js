import React from 'react';

function Name(props) {
  return (
    <div className="form-group">
      <label htmlFor="reci-name">Recipe</label>
      <input
        className="form-control"
        type="text"
        id="reci-name"
        value={props.recipe.name}
        onChange={dothething} />
    </div>
  );
}

function Method(props) {
  return (
    <div className="form-group">
      <label htmlFor="reci-method">
        Method
      </label>
      <textarea
        className="form-control"
        value={props.recipe.method}
        onChange={dothething}
        id="reci-method" />
    </div>
  );
}

function dothething() {
  console.log('hello');
}

function Ingredients(props) {
  const is = props.recipe.ingredients;
  const ingredients = is.map(i => (
    <tr key={i.name}>
      <td>{i.name}</td>
      <td>{i.quantity}</td>
      <td>{i.unit}</td>
    </tr>
  ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Quantity</th>
          <th>Units</th>
        </tr>
      </thead>
      <tbody>
        {ingredients}
      </tbody>
    </table>
  );
}

function Buttons(props) {
  return (
    <div className="btn-group btn-group-lg">
      <button className="btn btn-warning">Back</button>
      <button className="btn btn-warning">Save</button>
    </div>
  );
}

function Fields(props) {
  const r = props.recipe;
  return (
    <form>
      <Name recipe={r} />
      <Ingredients recipe={r} />
      <Method recipe={r} />
      <Buttons recipe={r} />
    </form>
  );
}

export function EditRecipe(props) {
  return (
    <div className="container text-center">
      <Fields recipe={props.recipe} />
    </div>
  );
}
