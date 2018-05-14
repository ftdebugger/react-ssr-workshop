import React from 'react';

import {connect} from 'react-redux';
import {DataComponent} from 'components/DataComponent/DataComponent';

const stateToProps = (state) => ({
    user: state.user
});

export const ReactRouterDataComponent = connect(stateToProps)(
    ({user}) => <DataComponent user={user}/>
);
