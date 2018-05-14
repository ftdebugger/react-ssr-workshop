import * as React from 'react';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {StaticRouter} from 'react-router';
import {renderToString} from 'react-dom/server';
import {render} from 'app';
import {router} from 'router';
import {Router} from 'express';

import {QuantumRouter} from 'components/QuantumRouter/QuantumRouter';
import {reactRouterLoadData} from 'data/reactRouterLoadData';

import {pageTemplate} from 'pageTemplate';

export default function createMiddleware({assets}) {

    async function renderHtml(req) {
        //let content = '';

        let content = renderToString(render());

        //let context = {};
        //let content = renderToString(
        //    <StaticRouter
        //        location={req.url}
        //        context={context}
        //    >
        //        {render()}
        //    </StaticRouter>
        //);


        //let data = await reactRouterLoadData(req.url);
        //
        //let store = createStore(
        //    (state) => state,
        //    data
        //);
        //
        //let context = {};
        //let content = renderToString(
        //    <Provider store={store}>
        //        <StaticRouter
        //            location={req.url}
        //            context={context}
        //        >
        //            {render()}
        //        </StaticRouter>
        //    </Provider>
        //);


        //let event = await router.match(req.url);
        //let content = renderToString(
        //    <QuantumRouter event={event}>
        //        {render()}
        //    </QuantumRouter>
        //);

        return pageTemplate({
            css: assets.main.css,
            js: assets.main.js,
            content,
            //data: JSON.stringify(data) // event.data
        });
    }

    function serverMiddleware(req, res, next) {
        renderHtml(req, res)
            .then((content) => {
                res.send(content);
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message,
                    stack: err.stack
                });
            });
    }

    let appRouter = new Router();

    //// Data loading
    //appRouter.get('/api/react-router-data', async (req, res, next) => {
    //    try {
    //        res.json((await reactRouterLoadData(req.query.url)));
    //    } catch (err) {
    //        res.status(500).json({
    //            message: err.message,
    //            stack: err.stack
    //        });
    //    }
    //});

    //// Data loading
    //appRouter.get('/api/data', async (req, res, next) => {
    //    try {
    //        res.json((await router.match(req.query.url)).data);
    //    } catch (err) {
    //        res.status(500).json({
    //            message: err.message,
    //            stack: err.stack
    //        });
    //    }
    //});

    // Other routes
    appRouter.get('/*', serverMiddleware);

    return appRouter;
}
