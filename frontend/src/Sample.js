import React,{Component} from "react";

class Sample extends React.Component{
    constructor(props){
        super(props);
        this.state={
            "name":"Hello World"
        }
        this.clickMe=this.clickMe.bind(this)
    }
    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    componentWillMount(){
        console.log("Hello");

    }
    componentDidMount(){
        console.log("Hello Manasa");
        
    }
    componentDidUpdate(){
        console.log("Madam")
    }
    clickMe(){
        this.setState({
            "name":"Manasa"
        })
        
    }

    render(){
        return (
            <button onClick={this.clickMe}>Hello {this.state.name}</button>
        )
    }
}

export default Sample;