import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import toastr from 'toastr';
import _ from 'lodash';

import helper from 'helpers/reactHelper';

import Confirm from 'components/common/Confirm';
import CategoriesList from './CategoriesList';
import SaveCategory from './SaveCategory';
import {loadCategories, saveCategory, deleteCategory} from 'actions/categoryActions';

const stateMap = state => ({
  categories: state.category.list
});

const actions = {
  loadCategories,
  saveCategory,
  deleteCategory
};

class CategoriesPage extends Component {
  state = {
    categoryToEdit: null,
    categoryToDeleteId: null
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

    toastr.success(`Category was updated`);

    this.setState({
      categoryToEdit: null
    });
  }

  async deleteCategory() {
    let response = await this.props.deleteCategory(this.state.categoryToDeleteId);

    if (_.isNumber(response)) {
      toastr.success('Category was deleted successfully!');
    }

    this.setState({
      categoryToDeleteId: null
    });
  }

  confirmDeleteCategory(id) {
    this.setState({
      categoryToDeleteId: id
    });
  }

  cancelDeleteCategory() {
    this.setState({
      categoryToDeleteId: null
    });
  }

  render() {
    let editCategoryVisible = this.state.categoryToEdit ? true : false;
    let deleteConfirmVisible = this.state.categoryToDeleteId ? true : false;

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
              deleteCategoryAction={this.confirmDeleteCategory}
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

        <Confirm
          visible={deleteConfirmVisible}
          action={this.deleteCategory}
          title={'Delete category'}
          close={this.cancelDeleteCategory}
        />
      </div>
    );
  }
}

export default helper.connect(CategoriesPage, stateMap, actions);
