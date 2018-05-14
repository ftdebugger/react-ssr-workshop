import * as React from 'react';

export function QuantumNavigation() {
    return (
        <nav className="nav">
            <a className="nav__link" href="/">Home</a>
            <a className="nav__link" href="/counter">Counter</a>
            <a className="nav__link" href="/data">Data</a>
        </nav>
    );
}
