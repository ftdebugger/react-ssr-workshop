import * as React from 'react';

export class DynamicCounterExample extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0
        };
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState(({counter}) => ({counter: counter + 1})),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="section">
                <h1 className="section__title">Counter {this.state.counter}</h1>
            </div>
        )
    }

}
