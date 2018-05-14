import * as React from 'react';

import {StaticHelloWorld} from 'components/StaticHelloWorld/StaticHelloWorld';
import {DynamicCounterExample} from 'components/DynamicCounterExample/DynamicCounterExample';
import {ReactRouterExample} from 'components/ReactRouterExample/ReactRouterExample';
import {ReactRouterDataExample} from 'components/ReactRouterDataExample/ReactRouterDataExample';
import {QuantumRouterExample} from 'components/QuantumRouterExample/QuantumRouterExample';

import './app.css';

export function render() {
    return <StaticHelloWorld />
    //return <DynamicCounterExample />
    //return <ReactRouterExample/>;
    //return <ReactRouterDataExample />
    //return <QuantumRouterExample/>;
}
