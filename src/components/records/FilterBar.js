import React, {Component} from 'react';
import {Button, Glyphicon, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import PropTypes from 'prop-types';

import helper from 'helpers/reactHelper';

class FilterBar extends Component {
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
    let addClick = () => {
      this.props.addRecordAction();
    };

    return (
      <div className="row">
        <div className="col-xs-8">
          <ButtonToolbar>
            <DropdownButton bsSize="small" title="Sort By:" id="sort-by-dropdown">
              {this.state.sortByOptions.map(item => {
                return (
                  <MenuItem
                    key={item.key}
                    onClick={() => this.props.onSortAction(item.key)}
                    active={this.props.sortBy === item.key}>
                    {item.text}
                  </MenuItem>
                );
              })}
            </DropdownButton>
          </ButtonToolbar>
        </div>

        <div className="col-xs-4 text-right">
          <Button bsStyle="success" onClick={addClick}>
            <Glyphicon glyph="plus" />
          </Button>
        </div>
      </div>
    );
  }
}

export default FilterBar;
