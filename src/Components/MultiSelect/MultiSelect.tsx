import * as React from 'react';
import './MultiSelect.css';

export interface IProps {
    
}
 
export interface IState {
    displayValue: string;
    searchValue: string;
    value: string;
    showOption: boolean;
    showInput: boolean;
    fakeData: any[];
}
 
class MultiSelect extends React.Component<IProps, IState> {
    ref: any;
    optionRef: any;
    constructor(props: IProps) {
        super(props);
        this.state = {
            displayValue: "",
            searchValue: "",
            value: "",
            showOption: false,
            showInput: true,
            fakeData: [
                { id: 1, title: "Red" },
                { id: 2, title: "Green" },
                { id: 3, title: "Blue" },
                { id: 4, title: "Yellow" },
                { id: 5, title: "Purple" },
                { id: 6, title: "Orange" },
            ]
        };
        this.ref = React.createRef()
        this.optionRef = React.createRef();
    }

    handleClickOutside = (e: any) => {
        if (this.optionRef.current && !this.optionRef.current.contains(e.target)) {
            this.setState({ showOption: false });
        }
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    render() { 
        return ( 
            <div>
                multi
            </div>
         );
    }
}
 
export default MultiSelect;