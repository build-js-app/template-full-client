import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import classnames from 'classnames';
import {Link, useParams} from 'react-router-dom';
import {Container, Row, Col} from 'components/bootstrap';

import {activateUserAccount} from 'actions/userActions';

interface ParamTypes {
  token: string;
}

function ActivationPage() {
  const dispatch = useDispatch();

  let {token} = useParams<ParamTypes>();

  const [activationData, setActivationData] = useState({message: '', status: ''});

  useEffect(() => {
    activateAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function activateAccount() {
    let data: any = await dispatch(activateUserAccount(token));

    if (data) setActivationData(data);
  }

  let status = activationData.status;

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

          {activationData.message && <div className={alertClass}>{activationData.message}</div>}

          <hr />

          <p>
            Redirect to login page: <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default ActivationPage;
