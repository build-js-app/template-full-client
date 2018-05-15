import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import _ from 'lodash';

import helper from 'helpers/reactHelper';
import uiHelper from 'helpers/uiHelper';

import CategoriesList from './CategoriesList';
import SaveCategory from './SaveCategory';
import {confirmAction} from 'actions/commonActions';
import {loadCategories, saveCategory, deleteCategory} from 'actions/categoryActions';

const stateMap = state => ({
  categories: state.category.list
});

const actions = {
  confirmAction,
  loadCategories,
  saveCategory,
  deleteCategory
};

class CategoriesPage extends Component {
  state = {
    categoryToEdit: null
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  addCategory() {
    this.setState({
      categoryToEdit: Object.assign({}, {title: '', description: ''})
    });
  }

  editCategory(category) {
    this.setState({
      categoryToEdit: Object.assign({}, category)
    });
  }

  cancelEditCategory() {
    this.setState({
      categoryToEdit: null
    });
  }

  updateCategoryState(field, value) {
    let category = this.state.categoryToEdit;

    category[field] = value;

    return this.setState({
      categoryToEdit: category
    });
  }

  async saveCategory() {
    await this.props.saveCategory(this.state.categoryToEdit);

    uiHelper.showMessage(`Category was updated`);

    this.setState({
      categoryToEdit: null
    });
  }

  async deleteCategory(id) {
    this.props.confirmAction({
      title: 'Delete category',
      action: async () => {
        let response = await this.props.deleteCategory(id);

        if (_.isNumber(response)) {
          uiHelper.showMessage('Category was successfully deleted');
        }
      }
    });
  }

  render() {
    let editCategoryVisible = this.state.categoryToEdit ? true : false;

    return (
      <div className="container-fluid">
        <Row>
          <Col sm={12} md={11} mdOffset={1}>
            <Row>
              <Col sm={12}>
                <h2>Categories Page</h2>
              </Col>
            </Row>

            <br />

            <Row>
              <Col sm={12}>
                <Button bsStyle="primary" onClick={this.addCategory}>
                  Add new category
                </Button>
              </Col>
            </Row>

            <CategoriesList
              categories={this.props.categories}
              editCategoryAction={this.editCategory}
              deleteCategoryAction={this.deleteCategory}
            />
          </Col>
        </Row>

        <SaveCategory
          visible={editCategoryVisible}
          category={this.state.categoryToEdit}
          save={this.saveCategory}
          close={this.cancelEditCategory}
          onChange={this.updateCategoryState}
        />
      </div>
    );
  }
}

export default helper.connect(CategoriesPage, stateMap, actions);
