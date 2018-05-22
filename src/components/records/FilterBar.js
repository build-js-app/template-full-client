import React, {Component} from 'react';
import {Row, Col, Button, Dropdown} from 'components/bootstrap';
import AppIcon from 'components/common/AppIcon';
import PropTypes from 'prop-types';

import helper from 'helpers/reactHelper';

class FilterBar extends Component {
  static propTypes = {
    sortBy: PropTypes.string.isRequired,
    addRecordAction: PropTypes.func.isRequired,
    onSortAction: PropTypes.func.isRequired
  };

  state = {
    isSortByOpen: false,
    sortByOptions: [{key: 'date', text: 'Date'}, {key: 'categoryId', text: 'Category'}, {key: 'cost', text: 'Cost'}]
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  render() {
    let addClick = () => {
      this.props.addRecordAction();
    };

    return (
      <Row>
        <Col xs={8}>
          <Dropdown
            size="sm"
            isOpen={this.state.isSortByOpen}
            toggle={() => this.setState({isSortByOpen: !this.state.isSortByOpen})}>
            <Dropdown.Toggle caret>Sort By</Dropdown.Toggle>
            <Dropdown.Menu>
              {this.state.sortByOptions.map(item => {
                return (
                  <Dropdown.Item
                    key={item.key}
                    onClick={() => this.props.onSortAction(item.key)}
                    active={this.props.sortBy === item.key}>
                    {item.text}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col xs={4} className="text-right">
          <Button color="success" onClick={addClick}>
            <AppIcon icon="plus" />
          </Button>
        </Col>
      </Row>
    );
  }
}

export default FilterBar;
