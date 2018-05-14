import {Router} from 'quantum-router';
import {dataLoadController} from 'data/dataLoadController';
import {clientRestoreData} from 'data/clientRestoreData';

// Quantum router example

export const router = new Router({
    routes: {
        '/': 'home',
        '/counter': 'counter',
        '/data': 'data',
        '*errorNotFound': 'errorNotFound'
    }
});

if (IS_SERVER) {
    router.use(async (event) => {
        event.data = await dataLoadController(event);
    });
} //else {
//    router.use(async (event) => {
//        let response = await fetch('/api/data?url=' + encodeURIComponent(event.url));
//        event.data = await response.json();
//    });
//}

if (IS_CLIENT) {
    let initialLoading = true;

    router.use(async (event) => {
        if (initialLoading) {
            event.data = clientRestoreData();
        } else {
            let response = await fetch('/api/data?url=' + encodeURIComponent(event.url));
            event.data = await response.json();
        }

        initialLoading = false;
    });
}

