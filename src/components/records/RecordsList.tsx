import React from 'react';
import {Row, Col, Form, Button} from 'components/bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {listTopMargin} from 'styles/shared';

import dateHelper from 'helpers/dateHelper';

import AppIcon from 'components/common/AppIcon';

const StyledList = styled(Row)`
  margin-top: ${listTopMargin};
`;

RecordsList.propTypes = {
  records: PropTypes.array,
  categories: PropTypes.array,
  editRecordAction: PropTypes.func.isRequired,
  deleteRecordAction: PropTypes.func.isRequired
};

function RecordsList({records, categories, editRecordAction, deleteRecordAction}) {
  function anyRecords() {
    return records && records.length;
  }

  function renderRecord(record) {
    let category = _.find(categories, category => {
      return category.id === record.categoryId;
    });

    let categoryTitle = category ? category.title : '';

    let dateDisplay = dateHelper.displayDate(record.date);

    let SubItem = props => (
      <Col sm={12} className="d-md-none d-lg-none">
        <Row>
          <Col sm={12}>
            <Form.Label>{props.title}:</Form.Label>
          </Col>
          <Col sm={12} className="form-group">
            {props.value}
          </Col>
        </Row>
      </Col>
    );

    return (
      <Row key={record.id} className="list-item align-items-center">
        <Col md={2} className="d-none d-md-block">
          {dateDisplay}
        </Col>

        <SubItem title="Date" value={dateDisplay} />

        <Col md={3} className="d-none d-md-block">
          {categoryTitle}
        </Col>

        <SubItem title="Category" value={categoryTitle} />

        <Col md={2} className="d-none d-md-block">
          {record.cost}
        </Col>

        <SubItem title="Cost" value={record.cost} />

        <Col md={3} className="d-none d-md-block">
          {record.note}
        </Col>

        <SubItem title="Note" value={record.note} />

        <Col md={1} xs={3}>
          <Button variant="link" className="list-action" onClick={() => editRecordAction(record)}>
            Edit
            <AppIcon icon="edit" />
          </Button>
        </Col>

        <Col md={1} xs={3}>
          <Button variant="link" className="list-action" onClick={() => deleteRecordAction(record.id)}>
            Delete
            <AppIcon icon="delete" />
          </Button>
        </Col>
      </Row>
    );
  }

  function render() {
    if (!anyRecords()) return <StyledList>No Records.</StyledList>;

    return (
      <StyledList>
        <Col>
          <Row className="list-item d-none d-md-flex">
            <Col md={2} className="d-none d-md-block">
              <Form.Label>Date</Form.Label>
            </Col>
            <Col md={3} className="d-none d-md-block">
              <Form.Label>Category</Form.Label>
            </Col>
            <Col md={2} className="d-none d-md-block">
              <Form.Label>Cost</Form.Label>
            </Col>
            <Col md={3} className="d-none d-md-block">
              <Form.Label>Note</Form.Label>
            </Col>
            <Col md={2} className="d-none d-md-block" />
          </Row>

          {records.map(record => renderRecord(record))}
        </Col>
      </StyledList>
    );
  }

  return render();
}

export default RecordsList;
