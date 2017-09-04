import React, {Component} from 'react';
import autoBind from 'react-autobind';
import toastr from 'toastr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import PageContent from '../common/PageContent';
import SaveRecord from './SaveRecord';
import RecordsList from './RecordsList';
import FilterBar from './FilterBar';
import Confirm from '../common/Confirm';
import * as recordActions from '../../actions/recordActions';
import * as categoryActions from '../../actions/categoryActions';

class RecordsPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    records: PropTypes.array,
    categories: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.state = {
      records: props.records,
      sortBy: 'date',
      categories: props.categories,
      recordToDeleteId: null,
      recordToEdit: null
    };

    autoBind(this);
  }

  componentDidMount() {
    this.props.actions.loadCategories();
    this.loadRecords();
  }

  async loadRecords() {
    await this.props.actions.loadRecords(this.state.sortBy);
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

  saveRecord() {
    this.props.actions.saveRecord(this.state.recordToEdit);

    toastr.success(`Record was successfully saved`);

    this.setState({
      recordToEdit: null
    });
  }

  deleteRecord() {
    this.props.actions.deleteRecord(this.state.recordToDeleteId);

    toastr.success('Record was deleted successfully!');

    this.setState({
      recordToDeleteId: null
    });
  }

  confirmDeleteRecord(id) {
    this.setState({
      recordToDeleteId: id
    });
  }

  cancelDeleteRecord() {
    this.setState({
      recordToDeleteId: null
    });
  }

  sortRecords(sortBy) {
    this.setState(
      {
        sortBy: sortBy
      },
      () => {
        this.loadRecords();
      }
    );
  }

  render() {
    let editRecordVisible = this.state.recordToEdit ? true : false;
    let deleteConfirmVisible = this.state.recordToDeleteId ? true : false;

    return (
      <PageContent>
        <section className="container-fluid">
          <div className="row">
            <aside className="col-xs-1" />
            <section className="content-main col-xs-10">
              <h1>Records Page</h1>

              <br />

              <FilterBar addRecordAction={this.addRecord} sortBy={this.state.sortBy} onSortAction={this.sortRecords} />

              <RecordsList
                records={this.props.records}
                categories={this.props.categories}
                editRecordAction={this.editRecord}
                deleteRecordAction={this.confirmDeleteRecord}
              />

              <SaveRecord
                visible={editRecordVisible}
                record={this.state.recordToEdit}
                categories={this.props.categories}
                save={this.saveRecord}
                close={this.cancelEditRecord}
                onChange={this.updateRecordState}
              />

              <Confirm
                visible={deleteConfirmVisible}
                action={this.deleteRecord}
                title={'Delete record'}
                close={this.cancelDeleteRecord}
              />
            </section>
            <aside className="col-xs-1" />
          </div>
        </section>
      </PageContent>
    );
  }
}

function mapStateToProps(state) {
  return {
    records: state.record.list,
    sortBy: state.record.sortBy,
    categories: state.category.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(_.assign({}, recordActions, categoryActions), dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecordsPage));
