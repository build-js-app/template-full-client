import React from 'react';
import {Row, Col, Button, Dropdown} from 'bootstrap';
import PropTypes from 'prop-types';

import AppIcon from 'components/common/AppIcon';

const sortByOptions = [{key: 'date', text: 'Date'}, {key: 'categoryId', text: 'Category'}, {key: 'cost', text: 'Cost'}];

FilterBar.propTypes = {
  sortBy: PropTypes.string.isRequired,
  addRecordAction: PropTypes.func.isRequired,
  onSortAction: PropTypes.func.isRequired
};

function FilterBar({sortBy, addRecordAction, onSortAction}) {
  return (
    <Row>
      <Col xs={8}>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-sort">Sort By</Dropdown.Toggle>
          <Dropdown.Menu>
            {sortByOptions.map(item => {
              return (
                <Dropdown.Item key={item.key} onClick={() => onSortAction(item.key)} active={sortBy === item.key}>
                  {item.text}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      <Col xs={4} className="text-right">
        <Button variant="success" onClick={addRecordAction}>
          <AppIcon icon="plus" />
        </Button>
      </Col>
    </Row>
  );
}

export default FilterBar;
