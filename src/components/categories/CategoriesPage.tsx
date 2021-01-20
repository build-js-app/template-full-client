import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col, Button} from 'components/bootstrap';
import _ from 'lodash';

import {confirmAction} from 'actions/commonActions';
import {loadCategories, saveCategory, deleteCategory} from 'actions/categoryActions';

import uiHelper from 'helpers/uiHelper';

import AppIcon from 'components/common/AppIcon';
import CategoriesList from './CategoriesList';
import SaveCategory from './SaveCategory';

function CategoriesPage() {
  const categories = useSelector((state: any) => state.category.list);

  const dispatch = useDispatch();

  const [categoryToEdit, setCategoryToEdit] = useState({});

  useEffect(() => {
    if (_.isEmpty(categories)) dispatch(loadCategories());
  });

  function addCategory() {
    setCategoryToEdit({title: '', description: ''});
  }

  function editCategory(category) {
    setCategoryToEdit({...category});
  }

  function cancelEditCategory() {
    setCategoryToEdit({});
  }

  function updateCategoryState(field, value) {
    let category = {...categoryToEdit};

    if (!category) return;

    category[field] = value;

    setCategoryToEdit(category);
  }

  async function onSaveCategory() {
    let category = await dispatch(saveCategory(categoryToEdit));

    if (category !== undefined) uiHelper.showMessage(`Category was updated`);

    cancelEditCategory();
  }

  async function onDeleteCategory(id) {
    dispatch(
      confirmAction({
        title: 'Delete category',
        action: async () => {
          let completed = await dispatch(deleteCategory(id));

          if (completed !== undefined) uiHelper.showMessage('Category was successfully deleted');
        }
      })
    );
  }

  function render() {
    let editCategoryVisible = _.isEmpty(categoryToEdit) ? false : true;

    return (
      <Container fluid>
        <Row>
          <Col md={{span: 10, offset: 1}}>
            <Row>
              <Col sm={12}>
                <h2>Categories Page</h2>
              </Col>
            </Row>

            <br />

            <Row>
              <Col sm={12} className="text-right">
                <Button variant="success" onClick={addCategory}>
                  <AppIcon icon="plus" />
                </Button>
              </Col>
            </Row>

            <CategoriesList
              categories={categories}
              editCategoryAction={editCategory}
              deleteCategoryAction={onDeleteCategory}
            />
          </Col>
        </Row>

        <SaveCategory
          visible={editCategoryVisible}
          category={categoryToEdit}
          save={onSaveCategory}
          close={cancelEditCategory}
          onChange={updateCategoryState}
        />
      </Container>
    );
  }

  return render();
}

export default CategoriesPage;
