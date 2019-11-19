import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { UPDATE_USER } from '../mutations/mutations';

export default class MutationUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
    }

    this.updateId = this.updateId.bind(this)
    this.updateName = this.updateName.bind(this)
  }

  updateName(name) {
    console.log('name: ', name)
    this.setState({
      name: name
    });
  }

  updateId(id) {
    console.log('id: ', id)
    this.setState({
      id: id
    });
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h1>Mutation: Update</h1>


        <UpdateUser
          state={this.state}
          updateName={this.updateName}
          updateId={this.updateId}
        />
      </div>
    );
  }
}

function UpdateUser({ state, updateName, updateId }) {
  const [updateUser] = useMutation(UPDATE_USER);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          updateUser({ variables: { name: state.name, id: state.id } });
        }}
      >
        <input
          type="text"
          value={ state.id }
          placeholder="ID"
          onChange={e => updateId(e.target.value)}
        />

        <input
          type="text"
          value={ state.name }
          placeholder="Name"
          onChange={e => updateName(e.target.value)}
        />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
}
