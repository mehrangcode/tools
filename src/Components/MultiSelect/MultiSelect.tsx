import * as React from 'react';
import './MultiSelect.css';

export interface IProps {
    
}
 
export interface IState {
    displayValue: any[];
    searchValue: string;
    value: string;
    showOption: boolean;
    showInput: boolean;
    fakeData: any[];
}
 
class MultiSelect extends React.Component<IProps, IState> {
    ref: any;
    optionRef: any;
    optionContainer: any;
    constructor(props: IProps) {
        super(props);
        this.state = {
            displayValue: [],
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
    _handleKeyDown = (e:any) =>{
        if (e.key === 'Enter') {
            const id = e.target.id;
            console.log("ID: ", id)
            const targetData = this.state.fakeData.filter(data => data.id === +id)[0]
            this.onSelectHandler(targetData)
          }
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
      
      optionHandler = (status: boolean) => {
        this.setState({showOption: status, showInput: true, searchValue:""}, () => {
            this.ref.current &&  this.ref.current.focus()
        })
    }

      onSelectHandler = (data: any) => {
          const displayList = this.state.displayValue;
          const hasOne = this.state.displayValue.some(item => item.id === data.id);
          if(!hasOne){
              displayList.push(data)
          }
        this.setState({ value: data.id.toString(), displayValue: displayList, showOption: false, showInput: false, })
    }

    onChangeHandler = (event: any) => {
        event.preventDefault();
        this.setState({ searchValue: event.target.value })
    }
    render() { 
        return ( 
            <div className="multiContainer" ref={this.optionRef}>
                <div className="multiDisplayContainer" onClick={() => this.optionHandler(true)}>
                    {this.state.displayValue.map((item, i) => {
                        return (
                            <div key={i} className="multiDisplayItem"> {item.title} </div>
                        )
                    })}
                    <input ref={this.ref} type="text" className="multiSearchInput" onChange={this.onChangeHandler} value={this.state.searchValue} />
                </div>
                <div className="multiDataList" ref={this.optionContainer} tabIndex={1}>
                    {this.state.fakeData.map((data, i) => {
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
 
export default MultiSelect;