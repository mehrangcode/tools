import * as React from 'react';

export interface ICOptionProps {
    children?: any;
    value: string;
    text: string;
}

export interface ICOptionState {

}

class COption extends React.Component<ICOptionProps, ICOptionState> {
    constructor(props: ICOptionProps) {
        super(props);
        this.state = {};
    }
    // render() {
    //     return this.props.children;
    // }
}

export default COption;