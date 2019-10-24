import React, {Component} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from './../bootstrap';

import {activateUserAccount} from '../../actions/userActions';

import helper from '../../helpers/reactHelper';

const stateMap = (state: any) => ({});

const actions = {
  activateUserAccount
};

class ActivationPage extends Component<any, any> {
  state = {
    activationData: {
      message: '',
      status: ''
    }
  };

  constructor(props: any) {
    super(props);

    helper.autoBind(this);
  }

  componentDidMount() {
    this.activateUserAccount();
  }

  async activateUserAccount() {
    let token = this.props.match.params.token;

    let data = await this.props.activateUserAccount(token);

    if (data) {
      this.setState({
        activationData: {...data}
      });
    }
  }

  render() {
    let status = this.state.activationData.status;

    let alertClass = classnames({
      alert: true,
      'alert-danger': status === 'error',
      'alert-success': status === 'success',
      'alert-warning': status === 'warning'
    });

    return (
      <Container>
        <Row>
          <Col sm={{span: 6, offset: 3}}>
            <h1>Activation Page</h1>

            <br />

            {this.state.activationData.message && <div className={alertClass}>{this.state.activationData.message}</div>}

            <hr />

            <p>
              Redirect to login page: <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default helper.connect(ActivationPage, stateMap, actions, {withRouter: true});
