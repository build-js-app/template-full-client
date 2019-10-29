import React, {Component} from 'react';
import {Row, Col, Button, Dropdown} from '../bootstrap';
import PropTypes from 'prop-types';

import helper from '../../helpers/reactHelper';

import AppIcon from '../common/AppIcon';

class FilterBar extends Component<any, any> {
  static propTypes = {
    sortBy: PropTypes.string.isRequired,
    addRecordAction: PropTypes.func.isRequired,
    onSortAction: PropTypes.func.isRequired
  };

  state = {
    sortByOptions: [{key: 'date', text: 'Date'}, {key: 'categoryId', text: 'Category'}, {key: 'cost', text: 'Cost'}]
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  render() {
    const {sortByOptions} = this.state;

    let addClick = () => {
      this.props.addRecordAction();
    };

    return (
      <Row>
        <Col xs={8}>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-sort">Sort By</Dropdown.Toggle>
            <Dropdown.Menu>
              {sortByOptions.map(item => {
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
          <Button variant="success" onClick={addClick}>
            <AppIcon icon="plus" />
          </Button>
        </Col>
      </Row>
    );
  }
}

export default FilterBar;
