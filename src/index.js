import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Key(props){
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Calculator extends React.Component{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){

    }

    renderKey(value, className){
        return(
            <Key value={value} className={className} onClick={this.handleClick}/>
        );
    }

    render(){
        return(
            <div>
                <input type="text" />
                <div className="calc-row">
                    {this.renderKey("AC", "top-key")}
                    {this.renderKey("%", "top-key")}
                    {this.renderKey("/", "top-key")}
                    {this.renderKey("*", "ops-key")}
                </div>
                <div className="calc-row">
                    {this.renderKey("7", "key")}
                    {this.renderKey("8", "key")}
                    {this.renderKey("9", "key")}
                    {this.renderKey("-", "ops-key")}
                </div>
                <div className="calc-row">
                    {this.renderKey("4", "key")}
                    {this.renderKey("5", "key")}
                    {this.renderKey("6", "key")}
                    {this.renderKey("+", "ops-key")}
                </div>
                <div className="calc-row">
                    {this.renderKey("1", "key")}
                    {this.renderKey("2", "key")}
                    {this.renderKey("3", "key")}
                    {this.renderKey(".", "ops-key")}
                </div>
                <div className="calc-row">
                    {this.renderKey("0", "zero-key")}
                    {this.renderKey("=", "ops-key")}
                </div>   
            </div>
        );
    }
}

ReactDOM.render(<Calculator />, 
    document.getElementById('root'));
