import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

class CategoriesList extends Component {
    static propTypes = {
        categories: PropTypes.array,
        editCategoryAction: PropTypes.func.isRequired,
        deleteCategoryAction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {

        };

        autoBind(this);
    }

    get anyCategories() {
        let categories = this.props.categories;
        return categories && categories.length;
    }

    render() {
        let style = {marginTop: 30};

        if (!this.anyCategories) return (
            <div style={style}>No categories.</div>
        );

        return (
            <div>
                <Table striped bordered style={style}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.categories.map(category => this.renderCategory(category))}
                    </tbody>
                </Table>
            </div>
        );
    }

    renderCategory(category) {
        let editClick = () => {
            this.props.editCategoryAction(category);
        };

        let deleteClick = () => {
            this.props.deleteCategoryAction(category.id);
        };

        return (
            <tr key={category.id}>
                <td>{category.title}</td>
                <td>{category.description}</td>
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

export default CategoriesList;
