import React from 'react';
import {Row, Col, Form, Button} from 'components/bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {listTopMargin, mediaQueries} from 'styles/shared';

import AppIcon from 'components/common/AppIcon';

CategoriesList.propTypes = {
  categories: PropTypes.array,
  editCategoryAction: PropTypes.func.isRequired,
  deleteCategoryAction: PropTypes.func.isRequired
};

function CategoriesList({categories, editCategoryAction, deleteCategoryAction}) {
  const anyCategories = () => {
    return categories && categories.length;
  };

  const StyledList = styled(Row)`
    margin-top: ${listTopMargin};

    @media ${mediaQueries.desktopMin} {
      margin-top: calc(${listTopMargin} - 2rem);
    }
  `;

  if (!anyCategories()) return <StyledList>No categories.</StyledList>;

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
    <StyledList>
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
    </StyledList>
  );
}

export default CategoriesList;
