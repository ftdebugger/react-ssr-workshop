import * as React from 'react';

export function DataComponent({user}) {
    return (
        <section className="section">
            <h1 className="section__title">Hello, {user}!</h1>
        </section>
    );
}
