import * as React from 'react';

import {router} from 'router';

export const QuantumContext = React.createContext({});

export class QuantumRouter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        router.use((event) => this.setState({event}));
    }

    render() {
        return (
            <QuantumContext.Provider value={this.state.event}>
                {this.props.children}
            </QuantumContext.Provider>
        );
    }

    static getDerivedStateFromProps({event}) {
        return {event}
    }

}
