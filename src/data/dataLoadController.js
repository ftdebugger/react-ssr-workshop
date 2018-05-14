export function dataLoadController(event) {
    if (event.name === 'data') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: 'John Snow'
                });
            }, 30);
        });
    }

    return {};
}
