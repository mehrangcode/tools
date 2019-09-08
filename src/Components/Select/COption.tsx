import * as React from 'react';

export interface ICOptionProps {
    children?: any;
}

export interface ICOptionState {

}

class COption extends React.Component<ICOptionProps, ICOptionState> {
    constructor(props: ICOptionProps) {
        super(props);
        this.state = {};
    }
    render() {
        return <div>Custom</div>;
    }
}

export default COption;