import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autoBind from 'react-autobind';

import '../styles/App.css';
import * as userActions from '../actions/userActions';

class App extends React.Component {
    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        children: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isAjaxLoad: props.isAjaxLoad
        };

        autoBind(this);
    }

    render() {
        return (
            <div>
                {this.props.isAjaxLoad &&
                    <div className="overlay-style"></div>
                }

                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAjaxLoad: state.ajaxCallsInProgress
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);