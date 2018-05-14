import * as React from 'react';
import {QuantumContext} from 'components/QuantumRouter/QuantumRouter';

export function QuantumRoute({name, component: Component}) {
    return (
        <QuantumContext.Consumer>
            {(event) => event.name === name
                ? (<Component event={event}/>)
                : null}
        </QuantumContext.Consumer>
    );
}
