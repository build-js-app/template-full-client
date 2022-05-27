import {useState} from 'react';
import {Container, Row, Col, Button} from 'components/bootstrap';
import {isEmpty} from 'lodash';

import categoryActions from 'actions/categoryActions';
import {useAppDispatch} from 'hooks';
import {confirmAction} from 'reducers/commonSlice';
import {useGetCategoriesQuery} from 'services/categoryService';

import uiHelper from 'helpers/uiHelper';

import AppIcon from 'components/common/AppIcon';
import CategoriesList from './components/list/CategoriesList';
import SaveCategory from './components/SaveCategory';

function CategoriesPage() {
  const {data: categories, error, isLoading} = useGetCategoriesQuery('');

  const dispatch = useAppDispatch();

  const [categoryToEdit, setCategoryToEdit] = useState({});

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
    const category = {...categoryToEdit};

    if (!category) return;

    category[field] = value;

    setCategoryToEdit(category);
  }

  async function onSaveCategory() {
    const category = await dispatch(categoryActions.saveCategory(categoryToEdit));

    if (category !== undefined) uiHelper.showMessage(`Category was updated`);

    cancelEditCategory();
  }

  async function onDeleteCategory(id) {
    dispatch(
      confirmAction({
        title: 'Delete category',
        action: async () => {
          const completed = await dispatch(categoryActions.deleteCategory(id));

          if (completed !== undefined) uiHelper.showMessage('Category was successfully deleted');
        }
      })
    );
  }

  function render() {
    const editCategoryVisible = isEmpty(categoryToEdit) ? false : true;

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
              <Col sm={12} className="text-end">
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
