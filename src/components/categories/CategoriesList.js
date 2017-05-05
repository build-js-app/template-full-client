import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import autoBind from 'react-autobind';

class CategoriesList extends Component {
    static propTypes = {
        categories: React.PropTypes.array.isRequired,
        editCategoryAction: React.PropTypes.func.isRequired,
        deleteCategoryAction: React.PropTypes.func.isRequired
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
            this.props.deleteCategoryAction(category._id);
        };

        return (
            <tr key={category._id}>
                <td>{category.title}</td>
                <td>{category.description}</td>
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

export default CategoriesList;
