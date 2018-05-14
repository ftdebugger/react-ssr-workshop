import * as React from 'react';

import {Switch, Route} from 'react-router';

import {DynamicCounterExample} from 'components/DynamicCounterExample/DynamicCounterExample';
import {StaticHelloWorld} from 'components/StaticHelloWorld/StaticHelloWorld';
import {ReactRouterNavigation} from 'components/ReactRouterNavigation/ReactRouterNavigation';

export function ReactRouterExample() {
    return (
        <section className="section">
            <ReactRouterNavigation />

            <div className="section__content">
                <Switch>
                    <Route path="/counter" component={DynamicCounterExample} />
                    <Route path="/" component={StaticHelloWorld} />
                </Switch>
            </div>
        </section>
    );
}
