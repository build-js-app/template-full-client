import React, {Component} from 'react';
import {Row, Col, ControlLabel, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

import helper from 'helpers/reactHelper';

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
    let style = {marginTop: 30};

    if (!this.anyCategories) return <div style={style}>No categories.</div>;

    return (
      <Row style={style}>
        <Col sm={12}>
          <Row className="item-row">
            <Col sm={3} xsHidden>
              <ControlLabel>Title</ControlLabel>
            </Col>
            <Col sm={3} xsHidden>
              <ControlLabel>Description</ControlLabel>
            </Col>
            <Col sm={2} xsHidden />
            <Col sm={2} xsHidden />
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
      <Row key={category.id} className="item-row">
        <Col sm={3} xsHidden>
          {category.title}
        </Col>

        <SubItem title="Title" value={category.title} />

        <Col sm={3} xsHidden>
          {category.description}
        </Col>

        <SubItem title="Description" value={category.description} />

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

export default CategoriesList;
