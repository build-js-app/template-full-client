import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Col} from 'components/bootstrap';
import {isEmpty} from 'lodash';

import {confirmAction} from 'actions/commonActions';
import {loadRecords, saveRecord, deleteRecord} from 'actions/recordActions';
import {loadCategories} from 'actions/categoryActions';
import {AppState} from 'reducers';

import uiHelper from 'helpers/uiHelper';

import SaveRecord from './SaveRecord';
import RecordsList from './RecordsList';
import FilterBar from './FilterBar';

function RecordsPage() {
  let dispatch = useDispatch();

  const records = useSelector((state: AppState) => state.record.list);
  const categories = useSelector((state: AppState) => state.category.list);
  const sortBy = useSelector((state: AppState) => state.record.sortBy);

  const [recordToEdit, setRecordToEdit] = useState({});

  useEffect(() => {
    dispatch(loadCategories());
    onLoadRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onLoadRecords() {
    await dispatch(loadRecords(sortBy));
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
    let record: any = {...recordToEdit};

    if (!record) return;

    record[field] = value;

    setRecordToEdit(record);
  }

  async function onSaveRecord() {
    let completed = await dispatch(saveRecord(recordToEdit));

    if (completed !== undefined) {
      await onLoadRecords();
      uiHelper.showMessage(`Record was successfully saved`);
    }

    cancelEditRecord();
  }

  function onDeleteRecord(id: number) {
    dispatch(
      confirmAction({
        title: 'Delete record',
        action: async () => {
          let completed = await dispatch(deleteRecord(id));

          if (completed !== undefined) uiHelper.showMessage('Record was successfully deleted');
        }
      })
    );
  }

  function sortRecords(sortBy: string) {
    dispatch(loadRecords(sortBy));
  }

  function render() {
    let editRecordVisible = isEmpty(recordToEdit) ? false : true;

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
