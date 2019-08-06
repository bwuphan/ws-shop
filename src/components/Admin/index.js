import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Loader from '../Loader';
import { withAuthorization } from '../Session';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1 className="text-center">Admin</h1>

        {loading && <div className="text-center"><Loader color="primary" /></div>}

        <UserList users={users} />

      </div>
    );
  }
}

const UserList = ({ users }) => (
  <div className="container">
    <h2 className="text-center card-header border">Users</h2>
    <div className="table-responsive">
      <table className="table table-bordered table-striped w-100">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.uid}>
              <td>{user.uid}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(AdminPage));