import React, {Component} from 'react';
import {Row, Col, Label, Button} from 'components/bootstrap';
import PropTypes from 'prop-types';

import helper from 'helpers/reactHelper';

import './categories.css';

class CategoriesList extends Component {
  static propTypes = {
    categories: PropTypes.array,
    editCategoryAction: PropTypes.func.isRequired,
    deleteCategoryAction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  get anyCategories() {
    let categories = this.props.categories;
    return categories && categories.length;
  }

  render() {
    if (!this.anyCategories) return <div className="categories-list">No categories.</div>;

    return (
      <Row className="categories-list">
        <Col sm={12}>
          <Row className="list-item d-none d-sm-flex">
            <Col sm={4} className="d-none d-sm-block">
              <Label>Title</Label>
            </Col>
            <Col sm={6} className="d-none d-sm-block">
              <Label>Description</Label>
            </Col>
            <Col sm={1} className="d-none d-sm-block" />
            <Col sm={1} className="d-none d-sm-block" />
          </Row>

          {this.props.categories.map(category => this.renderCategory(category))}
        </Col>
      </Row>
    );
  }

  renderCategory(category) {
    let editClick = () => {
      this.props.editCategoryAction(category);
    };

    let deleteClick = () => {
      this.props.deleteCategoryAction(category.id);
    };

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
      <Row key={category.id} className="list-item align-items-center">
        <Col sm={4} className="d-none d-sm-block">
          {category.title}
        </Col>

        <SubItem title="Title" value={category.title} />

        <Col sm={6} className="d-none d-sm-block">
          {category.description}
        </Col>

        <SubItem title="Description" value={category.description} />

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

export default CategoriesList;
