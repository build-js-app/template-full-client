import {isEmpty} from 'lodash';
import {useEffect, useState} from 'react';

import {Col, Container, Row} from 'components/bootstrap';

import recordActions from 'actions/recordActions';

import {useAppDispatch, useAppSelector} from 'hooks';

import {loadCategories} from 'reducers/categorySlice';
import {confirmAction} from 'reducers/commonSlice';

import uiHelper from 'helpers/uiHelper';

import FilterBar from './components/FilterBar';
import SaveRecord from './components/SaveRecord';
import RecordsList from './components/list/RecordsList';

function RecordsPage() {
  const dispatch = useAppDispatch();

  const records = useAppSelector(state => state.record.list);
  const categories = useAppSelector(state => state.category.list);
  const sortBy = useAppSelector(state => state.record.sortBy);

  const [recordToEdit, setRecordToEdit] = useState({});

  useEffect(() => {
    dispatch(loadCategories());
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

    if (completed) {
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
