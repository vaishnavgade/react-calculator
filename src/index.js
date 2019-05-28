import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const listOfOperations = [ "%",  "/", "*", "-", "+"];
const equalityChar = '=';

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
        this.state = {
            value:"",
            numbers:[],
            operations:[],
            isOperation: false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
    }

    handleClick(event){

    }

    handleChange(event){
        const userInput = event.target.value;
        if(!userInput.includes(equalityChar)){        
            this.setState({
                value: userInput,
            });

            const lastValue = userInput.charAt(userInput.length - 1);

            // check if last entered character is an operation
            if(!listOfOperations.includes(lastValue)){
                if(!this.state.isOperation){
                    let numbersArr = this.state.numbers.slice();
                    // modify the last element with user input
                    if(numbersArr.length === 0){
                        numbersArr.push(lastValue);
                    }
                    else{
                        numbersArr[numbersArr.length - 1]
                            = String(numbersArr[numbersArr.length - 1]).concat(lastValue);
                        console.log(numbersArr);
                    }

                    this.setState({
                        numbers: numbersArr,
                    });
                }
                else if(this.state.isOperation){
                    // when we encounter an operation symbol, push to the last instead of modifying the last element
                    // reset isOperation flag
                    let numbersArr = this.state.numbers.slice();
                    numbersArr.push(lastValue);
                    this.setState({
                        numbers: numbersArr,
                        isOperation: false,
                    })
                }
            }
            else if(listOfOperations.includes(lastValue)){
                // Avoid adding operators when we just added one
                if(!this.state.isOperation){
                    const operations = this.state.operations.slice();
                    operations.push(lastValue);
                    this.setState({
                        operations: operations,
                        isOperation: true,
                    });
                }
            }     
        }   
    }

    handleSumbit(event){
        event.preventDefault();

        const numbersArr = this.state.numbers.slice();
        const operationsArr = this.state.operations.slice();
        let result = 0;
        switch(operationsArr[0]){
            case '+':
                result = parseInt(numbersArr[0]) + parseInt(numbersArr[1]);
                break;
            case '-':
                result = parseInt(numbersArr[0]) - parseInt(numbersArr[1]);
                break;
            case '/':
                result = parseInt(numbersArr[0]) / parseInt(numbersArr[1]);
                break;
            case '*':
                result = parseInt(numbersArr[0]) * parseInt(numbersArr[1]);
                break;
            case '%':
                result = parseInt(numbersArr[0]) % parseInt(numbersArr[1]);
                break;
            default:
                result = 0;
                break;
        }
        
        // Display result, clear numbers and push result for further operations
        // clear operations and reset isOperation flag
        const newNumbers = [result];
        this.setState({
            value: result,
            numbers: newNumbers,
            operations:[],
            isOperation: false,
        });
    }

    renderKey(value, className){
        return(
            <Key value={value} className={className} onClick={this.handleClick}/>
        );
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSumbit}>
                    <input type="text" className="inputBox" value={this.state.value} onChange={this.handleChange}/>
                </form>
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
