import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const equalityChar = '=';
const resetChar = "AC";
const listOfOperations = [ resetChar, "%",  "/", "*", "-", "+", equalityChar];

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

    storeInput(value){
        // check if last entered character is an operation
        if(!listOfOperations.includes(value)){
            if(!this.state.isOperation){
                let numbersArr = this.state.numbers.slice();
                // modify the last element with user input
                if(numbersArr.length === 0){
                    numbersArr.push(value);
                }
                else{
                    numbersArr[numbersArr.length - 1]
                        = String(numbersArr[numbersArr.length - 1]).concat(value);
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
                numbersArr.push(value);
                this.setState({
                    numbers: numbersArr,
                    isOperation: false,
                })
            }
        }
        else if(listOfOperations.includes(value)){
            // Avoid adding operators when we just added one
            if(!this.state.isOperation){
                const operations = this.state.operations.slice();
                operations.push(value);
                this.setState({
                    operations: operations,
                    isOperation: true,
                });
            }
        } 
    }

    calculateResult(){
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

    handleClick(value){
        if(value.includes(resetChar)){
            this.setState({
                value: "",
                numbers: [],
                operations: [],
                isOperation: false,
            });
        }
        else if(value.includes(equalityChar)){
            this.calculateResult();
        }
        

        if(!value.includes(equalityChar) && !value.includes(resetChar)){        
            this.setState({
                value: String(this.state.value).concat(value),
            });

            this.storeInput(value);
        }        
    }

    handleChange(event){
        const userInput = event.target.value;
        if(!userInput.includes(equalityChar)){        
            this.setState({
                value: userInput,
            });

            const lastValue = userInput.charAt(userInput.length - 1);
            this.storeInput(lastValue);    
        }   
    }

    handleSumbit(event){
        event.preventDefault();

        this.calculateResult();
    }

    renderKey(value, className){
        return(
            <Key value={value} className={className} onClick={() => this.handleClick(value)}/>
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
