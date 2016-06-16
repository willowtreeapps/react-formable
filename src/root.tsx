import * as React from 'react';

export interface IFormableProps {
    projectName: string;
}

/**
 * Displays "Hello" followed by the passed in project name.
 */
export default class Formable extends React.Component<IFormableProps, {}>  {
    /**
     *
     *
     * @return {object} - React Component
     */
    public render(): React.ReactElement<{}> {
        return <span className="some-class-name">Hello {this.props.projectName}</span>;
    }
}
