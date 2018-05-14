import * as React from 'react';
import {Link} from 'react-router-dom';

export function ReactRouterNavigation() {
    return (
        <nav className="nav">
            <Link to="/" className="nav__link">Home</Link>
            <Link to="/counter" className="nav__link">Counter</Link>
        </nav>
    )
}
