import React from 'react';

function Heading(props) {
  return (
    <h2 className="display-4">
      {props.resource}s
    </h2>
  );
}

function Add(props) {
  return (
    <button className="btn btn-lg btn-warning">
      + Add {props.resource}
    </button>
  );
}

function Row(props) {
  return (
    <button className="list-group-item list-group-item-action">
      {props.name}
    </button>
  );
}

export function ResourceList(props) {
  const rows = props.data.map(r => <Row key={r.name} name={r.name} />);
  return (
    <div className="container text-center">
      <Heading resource={props.resource} />
      <div className="list-group list-group-flush">
        {rows}
      </div>
      <Add resource={props.resource} />
    </div>
  );
}
