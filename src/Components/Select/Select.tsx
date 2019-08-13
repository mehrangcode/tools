import * as React from 'react';
import './Select.css';
export interface IProps {
optionList?: any[];
url?: string;
}

export interface IState {
    displayValue: string;
    searchValue: string;
    value: string;
    showOption: boolean;
    showInput: boolean;
    activeItem: number;
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
            activeItem: 0,
        };
        this.ref = React.createRef()
        this.optionRef = React.createRef();
        this.optionContainer = React.createRef();
    }

    getOptions = (url: string) => {
        console.log("getOptions", url)
    }
    componentWillReceiveProps(nextProps:any){
        if(!this.props.url && nextProps.url){
            this.getOptions(nextProps.url)
        }
    }

    hideOption = () => {
        let {displayValue, showInput} = this.state
            if(this.state.value !=="" && this.props.optionList) {
                displayValue = this.props.optionList.filter(item=> item.id === +this.state.value)[0].title;
            } 
            showInput = false;
            this.setState({ showOption: false, showInput ,displayValue });
    }

    handleClickOutside = (e: any) => {
        if (this.optionRef.current && !this.optionRef.current.contains(e.target)) {
            this.hideOption()
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
        this.setState({ searchValue: event.target.value, displayValue: "", activeItem: 0 })
    }
    _handleKeyDown = (e:any) =>{
        if (e.key === 'Enter') {
            if(this.props.optionList){
                const matchData = this.state.searchValue.toLocaleLowerCase().trim()
               const datas= this.props.optionList.filter(data => data.title.toLocaleLowerCase().trim().match(matchData));
                const id = datas[this.state.activeItem].id;
                console.log("ID: ", id)
                const targetData = datas.filter(data => data.id === +id)[0]
                this.onSelectHandler(targetData)
            }
          }
    }
    onSelectHandler = (data: any) => {
        this.setState({ value: data.id.toString(), displayValue: data.title, showOption: false, showInput: false, activeItem:0 })
    }

    moveFocus = () => {
        const node = this.ref.current;
        const items: any[] = this.props.optionList ? this.props.optionList : []
        node.addEventListener('keydown', (e: any) => {
            let activeIndex = this.state.activeItem
            if(e.keyCode === 40 && activeIndex < (items.length -1)) {
                activeIndex++
              }
              if(e.keyCode === 38 && activeIndex > 0) {
                  activeIndex--
              }
              
            this.setState({activeItem: activeIndex})
        });
      }
    render() {
        let  datas= this.props.optionList ? this.props.optionList : [];
        if(this.state.searchValue !=="" && datas.length > 0) {
            const matchData = this.state.searchValue.toLocaleLowerCase().trim()
           datas= datas.filter(data => data.title.toLocaleLowerCase().trim().match(matchData));
        }
        console.log("STATE: ", this.state)
        return (
            <div className="selecContainer" ref={this.optionRef}>
                <div className="displayContainer" onClick={() => this.optionHandler(true)}>
                    <div className="inputContainer">
                        <input 
                        tabIndex={1}
                         className="selectInput" ref={this.ref} onKeyDown={this._handleKeyDown}
                        onBlur={this.hideOption}
                        style={{ display: this.state.showInput ? "block" : "none", 
                            width: this.state.searchValue.length === 0 ? "19px" :  (this.state.searchValue.length * 9)+"px"}}
                         type="text" onChange={(event) => this.onChangeHandler(event)} value={this.state.searchValue} />
                    </div>
                    <div className="selectDisplay">
                        {this.state.displayValue}
                    </div>
                    <div className="selectBtn">
                       \/
                    </div>
                </div>
                <div ref={this.optionContainer} tabIndex={-1} className={this.state.showOption ? "optionContainer" : "optionContainer optionHide"}>
                    {datas.map((data, i) => {
                        return (
                            <div key={i} id={data.id} className={this.state.activeItem === i ? "selectOption activeOption" : "selectOption"} onClick={() => this.onSelectHandler(data)}>
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