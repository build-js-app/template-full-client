import React, {Component} from 'react';
import autoBind from 'react-autobind';

import PageContent from '../common/PageContent';

class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        autoBind(this);
    }

    render() {
        return (
            <PageContent>
                <section className="container-fluid">

                </section>
            </PageContent>
        );
    }
}

export default SettingsPage;