import * as React from 'react';
import Formable from './root';

export default class ComponentExample extends React.Component<{}, {}>  {
    public render(): React.ReactElement<{}> {
        return <Formable projectName="react-formable" />;
    }
}
