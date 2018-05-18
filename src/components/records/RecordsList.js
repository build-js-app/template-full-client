import React, {Component} from 'react';
import {Row, Col, ControlLabel, Button} from 'react-bootstrap';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

import dateHelper from '../../helpers/dateHelper';

import './records.css';

class RecordsList extends Component {
  static propTypes = {
    records: PropTypes.array,
    categories: PropTypes.array,
    editRecordAction: PropTypes.func.isRequired,
    deleteRecordAction: PropTypes.func.isRequired
  };

  get anyRecords() {
    let records = this.props.records;
    return records && records.length;
  }

  render() {
    if (!this.anyRecords) return <div className="records-list">No Records.</div>;

    return (
      <Row className="records-list">
        <Col sm={12}>
          <Row className="item-row">
            <Col sm={2} xsHidden>
              <ControlLabel>Date</ControlLabel>
            </Col>
            <Col sm={3} xsHidden>
              <ControlLabel>Category</ControlLabel>
            </Col>
            <Col sm={2} xsHidden>
              <ControlLabel>Cost</ControlLabel>
            </Col>
            <Col sm={3} xsHidden>
              <ControlLabel>Note</ControlLabel>
            </Col>
            <Col sm={2} xsHidden />
            <Col sm={2} xsHidden />
          </Row>

          {this.props.records.map(record => this.renderRecord(record))}
        </Col>
      </Row>
    );
  }

  renderRecord(record) {
    let editClick = () => {
      this.props.editRecordAction(record);
    };

    let deleteClick = () => {
      this.props.deleteRecordAction(record.id);
    };

    let category = _.find(this.props.categories, category => {
      return category.id === record.categoryId;
    });

    let categoryTitle = category ? category.title : '';

    let dateDisplay = dateHelper.displayDate(record.date);

    let SubItem = props => (
      <Col xs={12} smHidden mdHidden lgHidden>
        <Row>
          <Col xs={12}>
            <ControlLabel>{props.title}:</ControlLabel>
          </Col>
          <Col xs={12} className="form-group">
            {props.value}
          </Col>
        </Row>
      </Col>
    );

    return (
      <Row key={record.id} className="item-row">
        <Col sm={2} xsHidden>
          {dateDisplay}
        </Col>

        <SubItem title="Date" value={dateDisplay} />

        <Col sm={3} xsHidden>
          {categoryTitle}
        </Col>

        <SubItem title="Category" value={categoryTitle} />

        <Col sm={2} xsHidden>
          {record.cost}
        </Col>

        <SubItem title="Cost" value={record.cost} />

        <Col sm={3} xsHidden>
          {record.note}
        </Col>

        <SubItem title="Note" value={record.note} />

        <Col sm={1} xs={3}>
          <Button bsStyle="link" onClick={editClick}>
            Edit
          </Button>
        </Col>

        <Col sm={1} xs={3}>
          <Button bsStyle="link" onClick={deleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    );
  }
}

export default RecordsList;
