import * as React from 'react';
import './Select.css';
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

class Select extends React.Component<IProps, IState> {
    ref: any;
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
    }
    
    optionHandler = (status: boolean) => {
        this.setState({showOption: status, showInput: true, searchValue:""}, () => {
            this.ref.current &&  this.ref.current.focus()
        })
    }

    onChangeHandler = (event: any) => {
        event.preventDefault();
        this.setState({ searchValue: event.target.value, displayValue: "" })
    }
    onSelectHandler = (data: any) => {
        this.setState({ value: data.id.toString(), displayValue: data.title, showOption: false, showInput: false, })
    }
    render() {
        let  datas= this.state.fakeData ? this.state.fakeData : [];
        if(this.state.searchValue !=="" && datas.length > 0) {
            const matchData = this.state.searchValue.toLocaleLowerCase()
           datas= this.state.fakeData.filter(data => data.title.toLocaleLowerCase().match(matchData));
        }
        console.log("STATE: ", this.state)
        return (
            <div className="selecContainer">
                <div className="displayContainer" onClick={() => this.optionHandler(true)}>
                    <div className="inputContainer">
                        <input className="selectInput" ref={this.ref}
                        style={{ display: this.state.showInput ? "block" : "none", 
                            width: this.state.searchValue.length === 0 ? "19px" :  (this.state.searchValue.length * 9)+"px"}}
                         type="text" onChange={(event) => this.onChangeHandler(event)} value={this.state.searchValue} placeholder={this.state.displayValue ==="" ? "Search..." : ""} />
                    </div>
                    <div className="selectDisplay">
                        {this.state.displayValue}
                    </div>
                    <div className="selectBtn">
                        X
                    </div>
                </div>
                <div className={this.state.showOption ? "optionContainer" : "optionContainer optionHide"}>
                    {datas.map((data, i) => {
                        return (
                            <div key={i} className="selectOption" onClick={() => this.onSelectHandler(data)}>
                                {data.title}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Select;