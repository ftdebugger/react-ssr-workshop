import {ReactRouterDataComponent} from 'components/ReactRouterDataComponent/ReactRouterDataComponent';
import {StaticHelloWorld} from 'components/StaticHelloWorld/StaticHelloWorld';
import {DynamicCounterExample} from 'components/DynamicCounterExample/DynamicCounterExample';

export const routesConfig = [
    {
        key: 'counter',
        path: '/counter',
        component: DynamicCounterExample
    },
    {
        key: 'data',
        path: '/data',
        component: ReactRouterDataComponent
    },
    {
        key: 'home',
        path: '/',
        component: StaticHelloWorld
    }
];
