import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'components/bootstrap';
import AppIcon from 'components/common/AppIcon';

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
      categoryToEdit: {title: '', description: ''}
    });
  }

  editCategory(category) {
    this.setState({
      categoryToEdit: {...category}
    });
  }

  cancelEditCategory() {
    this.setState({
      categoryToEdit: null
    });
  }

  updateCategoryState(field, value) {
    let category = this.state.categoryToEdit;

    if (!category) return;

    category[field] = value;

    return this.setState({
      categoryToEdit: category
    });
  }

  async saveCategory() {
    let category = await this.props.saveCategory(this.state.categoryToEdit);

    if (category) {
      uiHelper.showMessage(`Category was updated`);
    }

    this.setState({
      categoryToEdit: null
    });
  }

  async deleteCategory(id) {
    this.props.confirmAction({
      title: 'Delete category',
      action: async () => {
        let completed = await this.props.deleteCategory(id);

        if (completed) {
          uiHelper.showMessage('Category was successfully deleted');
        }
      }
    });
  }

  render() {
    let editCategoryVisible = this.state.categoryToEdit ? true : false;

    return (
      <Container fluid>
        <Row>
          <Col md={{size: 10, offset: 1}}>
            <Row>
              <Col sm={12}>
                <h2>Categories Page</h2>
              </Col>
            </Row>

            <br />

            <Row>
              <Col sm={12} className="text-right">
                <Button color="success" onClick={this.addCategory}>
                  <AppIcon icon="plus" />
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
      </Container>
    );
  }
}

export default helper.connect(
  CategoriesPage,
  stateMap,
  actions
);
