import * as React from 'react';

import {DynamicCounterExample} from 'components/DynamicCounterExample/DynamicCounterExample';
import {StaticHelloWorld} from 'components/StaticHelloWorld/StaticHelloWorld';
import {QuantumRoute} from 'components/QuantumRouter/QuantumRoute';
import {QuantumNavigation} from 'components/QuantumNavigation/QuantumNavigation';
import {QuantumDataComponent} from 'components/QuantumDataComponent/QuantumDataComponent';

export function QuantumRouterExample() {
    return (
        <section className="section">
            <QuantumNavigation />

            <div className="section__content">
                <QuantumRoute name="counter" component={DynamicCounterExample} />
                <QuantumRoute name="home" component={StaticHelloWorld} />
                <QuantumRoute name="data" component={QuantumDataComponent} />
            </div>
        </section>
    );
}
