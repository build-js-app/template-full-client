import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {Container, Row, Col} from 'components/bootstrap';
import styled, {css} from 'styled-components';

import userActions from 'actions/userActions';

import {colors} from 'styles/shared';

const StyledAlert = styled.div`
  ${props =>
    props.isSuccess &&
    css`
      color: ${colors.green_main};
      background-color: ${colors.green_light};
      border-color: ${colors.green_lighter};
    `}

  ${props =>
    props.isWarning &&
    css`
      color: ${colors.orange_main};
      background-color: ${colors.orange_light};
      border-color: ${colors.orange_lighter};
    `}

    ${props =>
    props.isError &&
    css`
      color: ${colors.red_main};
      background-color: ${colors.red_light};
      border-color: ${colors.red_lighter};
    `}
`;

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
    let data: any = await dispatch(userActions.activateUserAccount(token));

    if (data) setActivationData(data);
  }

  let status = activationData.status;

  return (
    <Container>
      <Row>
        <Col sm={{span: 6, offset: 3}}>
          <h1>Activation Page</h1>

          <br />

          {activationData.message && (
            <StyledAlert
              className="alert"
              isSuccess={status === 'success'}
              isWarning={status === 'warning'}
              isError={status === 'error'}>
              {activationData.message}
            </StyledAlert>
          )}

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
