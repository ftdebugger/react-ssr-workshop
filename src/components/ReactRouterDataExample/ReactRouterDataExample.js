import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {DynamicCounterExample} from 'components/DynamicCounterExample/DynamicCounterExample';
import {StaticHelloWorld} from 'components/StaticHelloWorld/StaticHelloWorld';
import {DataComponent} from 'components/DataComponent/DataComponent';
import {ReactRouterDataNavigation} from 'components/ReactRouterDataNavigation/ReactRouterDataNavigation';
import {ReactRouterDataSwitch} from 'components/ReactRouterDataSwitch/ReactRouterDataSwitch';

import {routesConfig} from 'routes';

export function ReactRouterDataExample() {
    return (
        <section className="section">
            <ReactRouterDataNavigation />

            <div className="section__content">
                <ReactRouterDataSwitch>
                    {routesConfig.map((route) => <Route {...route} />)}
                </ReactRouterDataSwitch>
            </div>
        </section>
    );
}
