import React, {Component} from 'react'
import BarGraph from '../components/TestingBranch/BarGraph'
import {CustomToggle, CustomMenu} from './components/CustomToggle'
import {Dropdown, Button} from 'react-bootstrap'
import PieChart from "../components/charts/PieChart";
import PieGraph from "../components/charts/PieGraph";
import Number from "../components/Numbers/Number";
import Total from '../components/Numbers/Total'
import Mental from "../components/Numbers/Mental";

export default class CityTable extends Component{
    constructor(props){
        super(props)

        this.state = {
            cityChoice : "Beaumont",
            value : "",
            trigger : true

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleSubmit(event) {
        console.log("before: ")
        console.log(this.state.cityChoice)

        this.setState({cityChoice : this.state.value})
    }
    
    runGraphs(city){
        return(

            <div>
            
            <BarGraph height = {400} 
            width = {800} 
            url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search='+ city + '+Race'}
            indexBy = "subpopulation"
            keys = {["interview", "observation"]}
            
            /> 
            <BarGraph height = {400} 
            width = {800} 
            url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search='+ city + '+Gender'}
            indexBy = "subpopulation"
            keys = {["interview", "observation"]}

            
            />

           <PieGraph height = {400}
                     url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search=Ethinicity+' + city}
           />
                <PieGraph height = {400}
                          url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search=Gender+' + city}
                />


                <Number height = {400}
                          url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search=homeless+' + city}
                />
                <Total height = {400}
                        url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search=Age+' + city}
                />






            </div>    
        )
    }
    render(){
    
        return(
            <div>
            <input style = {{width : 300}} type="text" value={this.state.value} onChange={this.handleChange} />
            <Button onClick = {this.handleSubmit}> Submit </Button>           

            {this.runGraphs(this.state.cityChoice)}
            </div>
        )
    }
}
