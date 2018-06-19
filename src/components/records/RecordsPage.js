import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'components/bootstrap';

import helper from 'helpers/reactHelper';
import uiHelper from 'helpers/uiHelper';

import {confirmAction} from 'actions/commonActions';
import {loadRecords, saveRecord, deleteRecord} from 'actions/recordActions';
import {loadCategories} from 'actions/categoryActions';

import SaveRecord from './SaveRecord';
import RecordsList from './RecordsList';
import FilterBar from './FilterBar';

const stateMap = state => ({
  records: state.record.list,
  sortBy: state.record.sortBy,
  categories: state.category.list
});

const actions = {
  confirmAction,
  loadCategories,
  loadRecords,
  saveRecord,
  deleteRecord
};

class RecordsPage extends Component {
  static propTypes = {
    records: PropTypes.array,
    categories: PropTypes.array
  };

  state = {
    recordToDeleteId: null,
    recordToEdit: null
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
    this.loadRecords();
  }

  async loadRecords() {
    await this.props.loadRecords(this.props.sortBy);
  }

  addRecord() {
    this.setState({
      recordToEdit: Object.assign({}, {date: new Date()})
    });
  }

  editRecord(record) {
    this.setState({
      recordToEdit: Object.assign({}, record)
    });
  }

  cancelEditRecord() {
    this.setState({
      recordToEdit: null
    });
  }

  updateRecordState(field, value) {
    let record = this.state.recordToEdit;

    record[field] = value;

    return this.setState({
      recordToEdit: record
    });
  }

  async saveRecord() {
    let completed = await this.props.saveRecord(this.state.recordToEdit);

    if (completed) {
      await this.props.loadRecords(this.props.sortBy);
      uiHelper.showMessage(`Record was successfully saved`);
    }

    this.setState({
      recordToEdit: null
    });
  }

  deleteRecord(id) {
    this.props.confirmAction({
      title: 'Delete record',
      action: async () => {
        let completed = await this.props.deleteRecord(id);

        if (completed) uiHelper.showMessage('Record was successfully deleted');
      }
    });
  }

  sortRecords(sortBy) {
    this.props.loadRecords(sortBy);
  }

  render() {
    const {recordToEdit} = this.state;
    const {records, categories, sortBy} = this.props;
    let editRecordVisible = this.state.recordToEdit ? true : false;

    return (
      <Container fluid>
        <Row>
          <Col md={{size: 10, offset: 1}}>
            <Row>
              <Col sm={12}>
                <h2>Records Page</h2>
              </Col>
            </Row>

            <br />

            <FilterBar addRecordAction={this.addRecord} sortBy={sortBy} onSortAction={this.sortRecords} />

            <RecordsList
              records={records}
              categories={categories}
              editRecordAction={this.editRecord}
              deleteRecordAction={this.deleteRecord}
            />
          </Col>
        </Row>

        <SaveRecord
          visible={editRecordVisible}
          record={recordToEdit}
          categories={categories}
          save={this.saveRecord}
          close={this.cancelEditRecord}
          onChange={this.updateRecordState}
        />
      </Container>
    );
  }
}

export default helper.connect(
  RecordsPage,
  stateMap,
  actions
);
