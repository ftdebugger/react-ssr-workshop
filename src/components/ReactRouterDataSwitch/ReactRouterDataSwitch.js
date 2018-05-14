import React from 'react';

import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';

class ReactRouterDataSwitchInternal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillReceiveProps() {
        if (this.state.loading || IS_SERVER) {
            return;
        }

        this.setState({loading: true});

        this.fetchData()
            .catch((err) => {
                console.log(err);
            })
            .then(() => {
                this.setState({loading: false});
            });
    }

    async fetchData() {
        let result = await fetch('/api/react-router-data?url=' + encodeURIComponent(location.pathname));
        let data = await result.json();

        this.props.dispatch({
            type: 'UPDATE_STORE',
            payload: data
        });
    }

    render() {
        if (IS_SERVER) {
            return (
                <Switch>{this.props.children}</Switch>
            );
        } else {
            if (this.state.loading) {
                return (
                    <section className="section">
                        <h1 className="section__title">Loading</h1>
                    </section>
                );
            }

            return (
                <Switch>{this.props.children}</Switch>
            );
        }
    }

}

export const ReactRouterDataSwitch = connect()(ReactRouterDataSwitchInternal);
