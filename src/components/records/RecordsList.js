import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import * as _ from 'lodash';

import dateHelper from '../../helpers/dateHelper';

class RecordsList extends Component {
    static propTypes = {
        records: React.PropTypes.array.isRequired,
        categories: React.PropTypes.array.isRequired,
        editRecordAction: React.PropTypes.func.isRequired,
        deleteRecordAction: React.PropTypes.func.isRequired
    };

    get anyRecords() {
        let records = this.props.records;
        return records && records.length;
    }

    render() {
        let style = {marginTop: 30};

        if (!this.anyRecords) return (
            <div style={style}>No Records.</div>
        );

        return (
            <div>
                <Table striped bordered style={style}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Cost</th>
                            <th>Note</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.records.map(record => this.renderRecord(record))}
                    </tbody>
                </Table>
            </div>
        );
    }

    renderRecord(record) {
        let editClick = () => {
            this.props.editRecordAction(record);
        };

        let deleteClick = () => {
            this.props.deleteRecordAction(record._id);
        };

        let category = _.find(this.props.categories, (category) => {
            return category._id === record.categoryId;
        });

        let dateDisplay = dateHelper.displayDate(record.date);

        return (
            <tr key={record._id}>
                <td>{dateDisplay}</td>
                <td>{category.title}</td>
                <td>{record.cost}</td>
                <td>{record.note}</td>
                <td>
                    <a href="#" onClick={editClick}>Edit</a>
                </td>
                <td>
                    <a href="#" onClick={deleteClick}>Delete</a>
                </td>
            </tr>
        );
    }
}

export default RecordsList;
