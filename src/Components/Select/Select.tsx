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
    optionRef: any;
    optionContainer: any;
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
        this.optionContainer = React.createRef();
    }

    handleClickOutside = (e: any) => {
        if (this.optionRef.current && !this.optionRef.current.contains(e.target)) {
            this.setState({ showOption: false });
        }
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        this.moveFocus()
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
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
    _handleKeyDown = (e:any) =>{
        if (e.key === 'Enter') {
            const id = e.target.id;
            console.log("ID: ", id)
            const targetData = this.state.fakeData.filter(data => data.id === +id)[0]
            this.onSelectHandler(targetData)
          }
    }
    onSelectHandler = (data: any) => {
        this.setState({ value: data.id.toString(), displayValue: data.title, showOption: false, showInput: false, })
    }
    moveFocus() {
        const node = this.optionContainer.current;
        node.addEventListener('keydown', function(e: any) {
          const active = document.activeElement;
          if(active){
            if(e.keyCode === 40 && active.nextSibling) {
                (active.nextSibling as any).focus();
              }
              if(e.keyCode === 38 && active.previousSibling) {
                (active.previousSibling as any).focus();
              }
          }
        });
      }
    render() {
        let  datas= this.state.fakeData ? this.state.fakeData : [];
        if(this.state.searchValue !=="" && datas.length > 0) {
            const matchData = this.state.searchValue.toLocaleLowerCase()
           datas= this.state.fakeData.filter(data => data.title.toLocaleLowerCase().match(matchData));
        }
        console.log("STATE: ", this.state)
        return (
            <div className="selecContainer" ref={this.optionRef}>
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
                       \/
                    </div>
                </div>
                <div ref={this.optionContainer} tabIndex={1} className={this.state.showOption ? "optionContainer" : "optionContainer optionHide"}>
                    {datas.map((data, i) => {
                        return (
                            <div key={i} id={data.id} tabIndex={i} onKeyDown={this._handleKeyDown} className="selectOption" onClick={() => this.onSelectHandler(data)}>
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