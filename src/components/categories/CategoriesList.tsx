import React from 'react';
import {Row, Col, Form, Button} from 'components/bootstrap';
import styled from 'styled-components';

import {listTopMargin, mediaQueries} from 'styles/shared';

import AppIcon from 'components/common/AppIcon';

const StyledList = styled(Row)`
  margin-top: ${listTopMargin};

  @media ${mediaQueries.desktopMin} {
    margin-top: calc(${listTopMargin} - 2rem);
  }
`;

interface Props {
  categories: Category[];
  editCategoryAction: (category: Category) => void;
  deleteCategoryAction: (categoryId: string) => void;
}

function CategoriesList({categories, editCategoryAction, deleteCategoryAction}: Props) {
  function anyCategories() {
    return categories && categories.length;
  }

  function renderCategory(category) {
    const SubItem = props => (
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
  }

  function render() {
    if (!anyCategories()) return <StyledList>No categories.</StyledList>;

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

  return render();
}

export default CategoriesList;
