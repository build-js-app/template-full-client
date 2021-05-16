import React, {Component} from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -200px;
  width: 400px;
  height: 400px;
`;

class ErrorBoundary extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({hasError: true});

    // eslint-disable-next-line
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <StyledError>
          <h3>Something went wrong.</h3>
        </StyledError>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
