import React, {Component} from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

import helper from '../../helpers/reactHelper';

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
    await this.props.action.saveRecord(this.state.recordToEdit);

    await this.props.loadRecords(this.props.sortBy);

    toastr.success(`Record was successfully saved`);

    this.setState({
      recordToEdit: null
    });
  }

  deleteRecord(id) {
    this.props.confirmAction({
      title: 'Delete record',
      action: async () => {
        this.props.deleteRecord(id);

        toastr.success('Record was deleted successfully!');
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
      <div className="container-fluid">
        <Row>
          <Col md={10} mdOffset={1}>
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
      </div>
    );
  }
}

export default helper.connect(RecordsPage, stateMap, actions);
