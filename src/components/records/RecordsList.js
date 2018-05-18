import React, {Component} from 'react';
import {Row, Col, Label, Button} from 'components/bootstrap';
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
          <Row className="list-item d-none d-sm-flex">
            <Col sm={2} className="d-none d-sm-block">
              <Label>Date</Label>
            </Col>
            <Col sm={3} className="d-none d-sm-block">
              <Label>Category</Label>
            </Col>
            <Col sm={2} className="d-none d-sm-block">
              <Label>Cost</Label>
            </Col>
            <Col sm={3} className="d-none d-sm-block">
              <Label>Note</Label>
            </Col>
            <Col sm={2} className="d-none d-sm-block" />
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
      <Col xs={12} className="d-sm-none d-md-none d-lg-none">
        <Row>
          <Col xs={12}>
            <Label>{props.title}:</Label>
          </Col>
          <Col xs={12} className="form-group">
            {props.value}
          </Col>
        </Row>
      </Col>
    );

    return (
      <Row key={record.id} className="list-item align-items-center">
        <Col sm={2} className="d-none d-sm-block">
          {dateDisplay}
        </Col>

        <SubItem title="Date" value={dateDisplay} />

        <Col sm={3} className="d-none d-sm-block">
          {categoryTitle}
        </Col>

        <SubItem title="Category" value={categoryTitle} />

        <Col sm={2} className="d-none d-sm-block">
          {record.cost}
        </Col>

        <SubItem title="Cost" value={record.cost} />

        <Col sm={3} className="d-none d-sm-block">
          {record.note}
        </Col>

        <SubItem title="Note" value={record.note} />

        <Col sm={1} xs={3}>
          <Button color="link" onClick={editClick}>
            Edit
          </Button>
        </Col>

        <Col sm={1} xs={3}>
          <Button color="link" onClick={deleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    );
  }
}

export default RecordsList;
