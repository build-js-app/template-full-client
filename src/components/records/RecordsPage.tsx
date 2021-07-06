import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col} from 'components/bootstrap';
import {isEmpty} from 'lodash';

import commonActions from 'actions/commonActions';
import recordActions from 'actions/recordActions';
import categoryActions from 'actions/categoryActions';
import {AppState} from 'reducers';

import uiHelper from 'helpers/uiHelper';

import SaveRecord from './SaveRecord';
import RecordsList from './RecordsList';
import FilterBar from './FilterBar';

function RecordsPage() {
  const dispatch = useDispatch();

  const records = useSelector((state: AppState) => state.record.list);
  const categories = useSelector((state: AppState) => state.category.list);
  const sortBy = useSelector((state: AppState) => state.record.sortBy);

  const [recordToEdit, setRecordToEdit] = useState({});

  useEffect(() => {
    dispatch(categoryActions.loadCategories());
    onLoadRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onLoadRecords() {
    await dispatch(recordActions.loadRecords(sortBy));
  }

  function addRecord() {
    setRecordToEdit({date: new Date()});
  }

  function editRecord(record) {
    setRecordToEdit({...record});
  }

  function cancelEditRecord() {
    setRecordToEdit({});
  }

  function updateRecordState(field: string, value) {
    const record: any = {...recordToEdit};

    if (!record) return;

    record[field] = value;

    setRecordToEdit(record);
  }

  async function onSaveRecord() {
    const completed = await dispatch(recordActions.saveRecord(recordToEdit));

    if (completed !== undefined) {
      await onLoadRecords();
      uiHelper.showMessage(`Record was successfully saved`);
    }

    cancelEditRecord();
  }

  function onDeleteRecord(id: number) {
    dispatch(
      commonActions.confirmAction({
        title: 'Delete record',
        action: async () => {
          const completed = await dispatch(recordActions.deleteRecord(id));

          if (completed !== undefined) uiHelper.showMessage('Record was successfully deleted');
        }
      })
    );
  }

  function sortRecords(sortBy: string) {
    dispatch(recordActions.loadRecords(sortBy));
  }

  function render() {
    const editRecordVisible = isEmpty(recordToEdit) ? false : true;

    return (
      <Container fluid>
        <Row>
          <Col md={{span: 10, offset: 1}}>
            <Row>
              <Col sm={12}>
                <h2>Records Page</h2>
              </Col>
            </Row>

            <br />

            <FilterBar addRecordAction={addRecord} sortBy={sortBy} onSortAction={sortRecords} />

            <RecordsList
              records={records}
              categories={categories}
              editRecordAction={editRecord}
              deleteRecordAction={onDeleteRecord}
            />
          </Col>
        </Row>

        <SaveRecord
          visible={editRecordVisible}
          record={recordToEdit}
          categories={categories}
          save={onSaveRecord}
          close={cancelEditRecord}
          onChange={updateRecordState}
        />
      </Container>
    );
  }

  return render();
}

export default RecordsPage;
