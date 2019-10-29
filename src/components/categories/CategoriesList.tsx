import React from 'react';
import {Row, Col, Form, Button} from '../bootstrap';
import PropTypes from 'prop-types';

import AppIcon from '../common/AppIcon';

import './categories.scss';

function CategoriesList({categories, editCategoryAction, deleteCategoryAction}) {
  const anyCategories = () => {
    return categories && categories.length;
  };

  if (!anyCategories()) return <div className="categories-list">No categories.</div>;

  const renderCategory = category => {
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
      <Row key={category.id} className="list-item align-items-center">
        <Col md={4} className="d-none d-md-block">
          {category.title}
        </Col>

        <SubItem title="Title" value={category.title} />

        <Col md={6} className="d-none d-md-block">
          {category.description}
        </Col>

        <SubItem title="Description" value={category.description} />

        <Col md={1} xs={3}>
          <Button variant="link" className="list-action" onClick={() => editCategoryAction(category)}>
            Edit
            <AppIcon icon="edit" />
          </Button>
        </Col>

        <Col md={1} xs={3}>
          <Button variant="link" className="list-action" onClick={() => deleteCategoryAction(category.id)}>
            Delete
            <AppIcon icon="delete" />
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <Row className="categories-list">
      <Col>
        <Row className="list-item d-none d-md-flex">
          <Col sm={4} className="d-none d-md-block">
            <Form.Label>Title</Form.Label>
          </Col>
          <Col sm={6} className="d-none d-md-block">
            <Form.Label>Description</Form.Label>
          </Col>
          <Col sm={1} className="d-none d-md-block" />
          <Col sm={1} className="d-none d-md-block" />
        </Row>

        {categories.map(category => renderCategory(category))}
      </Col>
    </Row>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.array,
  editCategoryAction: PropTypes.func.isRequired,
  deleteCategoryAction: PropTypes.func.isRequired
};

export default CategoriesList;
