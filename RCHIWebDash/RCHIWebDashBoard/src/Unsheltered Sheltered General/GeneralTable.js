import React, {Component} from 'react'

import BarGraph from '../components/TestingBranch/BarGraph'
import PieGraph from "../components/charts/PieGraph";
import PieChart2 from "../components/charts/PieChart2"
import Mental from "../components/Numbers/Mental";
import PTSD from "../components/Numbers/PTSD";
import Substance from "../components/Numbers/Substance";
import Physical from "../components/Numbers/Physical";

export default class GeneralTable extends Component{
    constructor(props){
        super(props)


    }

    componentDidMount(){
        
    }
    render(){
        console.log("rendering")
        return(
        <div>
            <BarGraph height = {600} 
            width = {800} 
            url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Race'
            indexBy = "subpopulation"
            keys = {["interview", "observation"]}
            
            /> 

            <PieGraph height = {300}
            url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Gender'
            />

            <PieGraph height = {500}
            url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=households'
            />

            
            <PieChart2 height = {500}
            url = "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/?search=Ethnicity"
            />

            <Mental height = {200}
                    url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}

            />

            <PTSD height = {200}
                    url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}

            />
            <Substance height = {200}
                  url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}

            />
            <Physical height = {200}
                       url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}

            />


        </div>

        )
    }
}
