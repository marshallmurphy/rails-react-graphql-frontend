import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_USER } from '../mutations/mutations';

export default class MutationCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    }

    this.updateName = this.updateName.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
  }

  updateName(name) {
    console.log('name: ', name)
    this.setState({
      name: name
    });
  }

  updateEmail(email) {
    console.log('email: ', email)
    this.setState({
      email: email
    });
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h1>Mutation: Create</h1>

        <CreateUser
          state={this.state}
          updateName={this.updateName}
          updateEmail={this.updateEmail}
        />
      </div>
    );
  }
}

function CreateUser({ state, updateName, updateEmail }) {
  const [createUser, {loading, error, data}] = useMutation(CREATE_USER);

  let variables = {
    name: state.name,
    email: state.email
  }

  if (data) {
    console.log('Data: ', data);
  }

  return (
    <form onSubmit={e => {
        e.preventDefault();
        createUser({ variables: variables });
      }}>
      <input
        type="text"
        value={ state.name }
        placeholder="Name"
        onChange={e => updateName(e.target.value)}
      />

      <input
        type="text"
        value={ state.email }
        placeholder="Email"
        onChange={e => updateEmail(e.target.value)}
      />

      <button type="submit">Create User</button>
    </form>
  );
}
