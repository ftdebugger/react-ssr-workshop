import * as React from 'react';
import {DataComponent} from 'components/DataComponent/DataComponent';

export function QuantumDataComponent({event}) {
    return (
        <DataComponent user={event.data.user}/>
    );
}
