import * as React from 'react';
import './MultiSelect.css';

export interface IProps {
    optionList?: any[];
    url?: string;
    
}
 
export interface IState {
    displayValue: any[];
    searchValue: string;
    value: string;
    showOption: boolean;
    showInput: boolean;
    activeItem: number;
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
            activeItem: -1,
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
        this.setState({ showOption: false, searchValue:"", activeItem: -1 });
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
    _handleKeyDown = (e:any) =>{
        if (e.key === 'Enter' && this.state.activeItem >= 0) {
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
    moveFocus() {
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
          this.ref.current &&  this.ref.current.focus()
        this.setState({ value: data.id.toString(), displayValue: displayList })
    }


    
    onChangeHandler = (event: any) => {
        event.preventDefault();
        this.setState({ searchValue: event.target.value, activeItem: 0 })
    }
    unselectItem = (item: any) => {
        const selectedList = this.state.displayValue;
        const newSelectedList =selectedList.filter(selected => selected.id !== item.id)
        this.setState({displayValue: newSelectedList})
    }
    render() { 
        let  datas= this.props.optionList ? this.props.optionList : [];
        if(this.state.searchValue !=="" && datas.length > 0) {
            const matchData = this.state.searchValue.toLocaleLowerCase().trim()
           datas= datas.filter(data => data.title.toLocaleLowerCase().trim().match(matchData));
        }
        return ( 
            <div className="multiContainer" ref={this.optionRef}>
                <div className="multiDisplayContainer" onClick={() => this.optionHandler(true)}>
                    {this.state.displayValue.map((item, i) => {
                        return (
                            <div key={i} className="multiDisplayItem"> 
                            <div className="multiselectItem"> {item.title} </div>
                            <div className="multiUnselect" onClick={() => this.unselectItem(item)}>x</div>
                            </div>
                        )
                    })}
                    <input
                    tabIndex={0}
                    // onBlur={this.hideOption}
                    style={{ display: this.state.showInput ? "block" : "none", 
                    width: this.state.searchValue.length === 0 ? "19px" :  (this.state.searchValue.length * 9)+"px"}}
                    onKeyDown={this._handleKeyDown}
                    ref={this.ref} type="text" className="multiSearchInput" 
                    onChange={this.onChangeHandler} 
                    value={this.state.searchValue} />
                </div>
                <div className={this.state.showOption ? "multiDataList" : "multiDataList optionHide"} ref={this.optionContainer} tabIndex={-1}>
                    {datas.map((data, i) => {
                        const isSelected = this.state.displayValue.some(selectedItem => selectedItem.id === data.id)
                        return (
                            <div key={i} id={data.id}  
                            className={
                                i === this.state.activeItem
                                 ? "multiSelectOption multiOptionActive" :
                                  isSelected ? " multiSelectOption multiSelectedItem" :
                                   "multiSelectOption"} 
                                   onClick={() => this.onSelectHandler(data)}>
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