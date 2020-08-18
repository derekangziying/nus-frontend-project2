import React, {} from 'react';  
import logo from './logo.svg';  
import './App.css';      
import * as d3 from 'd3';

class App extends React.Component {   
  constructor(props) {                
      super(props);               
      this.state = {    // state is an object where you store property values. When the state object changes, the component re-renders.
        disabled: true,
        serverResponse1: "" , 
        serverResponse2: "", 
        yAxisAttribute: "name",
        xAxisAttribute: "value",
        width: 1000,
        height: 400,
        data: [{name: "Bank A", value:20},{name: "Bank B", value: 20},{name: "Bank C", value: 20},{name: "Bank D", value: 20},{name: "Bank E", value: 20}]
    }
  }

  callAPIServer1() {                     
      fetch("http://localhost:7000/balances")
          .then(res => res.text())      
          .then(res => this.setState({ serverResponse1: res }))
          .catch(err => err);
  }

  callAPIServer2() {                     
    fetch("http://localhost:7000/banknames")
        .then(res => res.text())      
        .then(res => this.setState({ serverResponse2: res }))
        .catch(err => err);
  }

  drawChart() {
    let margin = {top: 20, right: 30, bottom: 40, left: 90},
                width = this.state.width - margin.left - margin.right,
                height = this.state.height - margin.top - margin.bottom;
    
    let svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    let x = d3.scaleLinear()
            .domain([0, 100])
            .range([ 0, width]);
    svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr('class','axis x')
            .call(d3.axisBottom(x))
            .selectAll("text")
            .text((x) => '$'+x)
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
    
    let y = d3.scaleBand()
            .range([ 0, height ])
            .domain(this.state.data.map((d) =>  d[this.state.yAxisAttribute]))
            .padding(.1);
    svg.append("g")
            .attr('class','axis y')
            .call(d3.axisLeft(y))
            .selectAll("text")
            .attr("dy", null)
    
    svg.selectAll("myRect")
            .data(this.state.data)
            .enter()
            .append("rect")
            .on('mouseover', function(){
                d3.select(this).style('opacity', 0.5)
             })
            .on('mouseout', function(){
                d3.select(this).style('opacity', 1)
             })
            .attr("x", x(0) )
            .attr("y", (d) => y(d[this.state.yAxisAttribute]))
            .attr("width", 0)
            .attr("height", y.bandwidth() -10 )
            .attr("fill", "#DF337D")
            .transition(d3.transition().duration(1000))
            .attr("width", (d) => x(d[this.state.xAxisAttribute]))
    }
  
  handleClick1 = () => {
    var arr1 = this.state.serverResponse1.split(',')
    var arr = []
    var i;
    var question = "";
    for (i = 0; i < arr1.length; i++) {
      question += "?"
      arr[i] = {name: question,value: parseInt(arr1[i])}
    }
    this.setState({         //initiate this.setState to replace the 'data' object with the 'arr' object
      data: arr,            
      disabled: false
    })
  }

  handleClick2 = () => {
    var arr1 = this.state.serverResponse1.split(',')
    var arr2 = this.state.serverResponse2.split(',')
    var arr = []
    var i;
    for (i = 0; i < arr1.length; i++) {
      arr[i] = {name: arr2[i],value: parseInt(arr1[i])}
    }
    this.setState({
      data: arr,
      disabled: false
    })
  }
  handleClick3 = () => {
    this.drawChart();
  }

  clickToRefresh = () => {
    window.location.reload(false);
  }

  componentDidMount() {   
    this.callAPIServer1();
    this.callAPIServer2();
  }

  render() {
      return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome!</h1>
                  <h3 className="App-intro">Please click the buttons to navigate the App</h3>
                  <button className="btn" onClick={this.handleClick1}>Balances</button>
                  <button className="btn" onClick={this.handleClick2}>Bank Names</button><br/>
                  <button className="btn" disabled={this.state.disabled} onClick={this.handleClick3}>Draw Chart</button><br/>
                  <button className="btn" onClick={this.clickToRefresh}>Refresh</button>

              </header>
          </div>
      );
  }
}

export default App;
