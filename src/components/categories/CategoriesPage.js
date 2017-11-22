import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {Row, Col, Button} from 'react-bootstrap';
import toastr from 'toastr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';

import AppPage from '../common/AppPage';
import CategoriesList from './CategoriesList';
import SaveCategory from './SaveCategory';
import Confirm from '../common/Confirm';
import * as categoryActions from '../../actions/categoryActions';

class CategoriesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: props.categories,
      categoryToEdit: null,
      categoryToDeleteId: null
    };

    autoBind(this);
  }

  componentWillMount() {
    this.props.actions.loadCategories();
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
    await this.props.actions.saveCategory(this.state.categoryToEdit);

    toastr.success(`Category was updated`);

    this.setState({
      categoryToEdit: null
    });
  }

  async deleteCategory() {
    let response = await this.props.actions.deleteCategory(this.state.categoryToDeleteId);

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
      <AppPage title="Categories">
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
      </AppPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.category.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesPage));
