import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

import dateHelper from '../../helpers/dateHelper';

class RecordsList extends Component {
    static propTypes = {
        records: PropTypes.array,
        categories: PropTypes.array,
        editRecordAction: PropTypes.func.isRequired,
        deleteRecordAction: PropTypes.func.isRequired
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
            this.props.deleteRecordAction(record.id);
        };

        let category = _.find(this.props.categories, (category) => {
            return category.id === record.categoryId;
        });

        let categoryTitle = category ? category.title : '';

        let dateDisplay = dateHelper.displayDate(record.date);

        return (
            <tr key={record.id}>
                <td>{dateDisplay}</td>
                <td>{categoryTitle}</td>
                <td>{record.cost}</td>
                <td>{record.note}</td>
                <td>
                    <Button bsStyle="link" onClick={editClick}>Edit</Button>
                </td>
                <td>
                    <Button bsStyle="link" onClick={deleteClick}>Delete</Button>
                </td>
            </tr>
        );
    }
}

export default RecordsList;
