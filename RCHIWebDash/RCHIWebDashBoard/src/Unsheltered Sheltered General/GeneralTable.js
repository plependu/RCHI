import React, {Component} from 'react'

import BarGraph from '../components/TestingBranch/BarGraph'
import PieGraph from "../components/charts/PieGraph";
import PieChart2 from "../components/charts/PieChart2"
// import TableComponent from "../components/charts/TableComponent"
// import TableComponent2 from "../components/charts/TableComponent2"
import TableComponent3 from "../components/charts/TableComponent3"
import TableComponent4 from "../components/charts/TableComponent4"

export default class GeneralTable extends Component{
    constructor(props){
        super(props)

        this.const_data_for_unsheltered_table = [
          {
            "id":1,
            "subpopulation":"Individuals",
            "category":"2018",
            "total":1685
          },
          {
            "id":2,
            "subpopulation":"Adults(>=25)",
            "category":"2018",
            "total":1350
          },
          {
            "id":3,
            "subpopulation":"Individuals",
            "category":"2019",
            "total":2045
          },
          {
            "id":4,
            "subpopulation":"Adults(>=25)",
            "category":"2019",
            "total":1718
          },
          {
            "id":5,
            "subpopulation":"Youth(18-24)",
            "category":"2018",
            "total":177
          },
          {
            "id":6,
            "subpopulation":"Youth(18-24)",
            "category":"2019",
            "total":181
          },
          {
            "id":7,
            "subpopulation":"Children(<=17)",
            "category":"2018",
            "total":4
          },
          {
            "id":8,
            "subpopulation":"Children(<=17)",
            "category":"2019",
            "total":15
          },
          {
            "id":9,
            "subpopulation":"Unknown Age",
            "category":"2018",
            "total":154
          },
          {
            "id":10,
            "subpopulation":"Unknown Age",
            "category":"2019",
            "total":131
          },
          {
            "id":11,
            "subpopulation":"Male",
            "category":"2018",
            "total":1131
          },
          {
            "id":12,
            "subpopulation":"Male",
            "category":"2019",
            "total":1384
          },
          {
            "id":13,
            "subpopulation":"Female",
            "category":"2018",
            "total":488
          },
          {
            "id":14,
            "subpopulation":"Female",
            "category":"2019",
            "total":584
          },
          {
            "id":15,
            "subpopulation":"Transgender",
            "category":"2018",
            "total":6
          },
          {
            "id":16,
            "subpopulation":"Transgender",
            "category":"2019",
            "total":11
          },
          {
            "id":17,
            "subpopulation":"Gender Non-Con",
            "category":"2018",
            "total":8
          },
          {
            "id":18,
            "subpopulation":"Gender Non-Con",
            "category":"2019",
            "total":7
          },
          {
            "id":19,
            "subpopulation":"Unknown Gender",
            "category":"2018",
            "total":52
          },
          {
            "id":20,
            "subpopulation":"Unknown Gender",
            "category":"2019",
            "total":95
          },
          {
            "id":21,
            "subpopulation":"White",
            "category":"2018",
            "total":934
          },
          {
            "id":22,
            "subpopulation":"White",
            "category":"2019",
            "total":1111
          },
          {
            "id":23,
            "subpopulation":"Native Hawaiian",
            "category":"2018",
            "total":26
          },
          {
            "id":24,
            "subpopulation":"Native Hawaiian",
            "category":"2019",
            "total":21
          },
          {
            "id":25,
            "subpopulation":"Black",
            "category":"2018",
            "total":216
          },
          {
            "id":26,
            "subpopulation":"Black",
            "category":"2019",
            "total":241
          },
          {
            "id":27,
            "subpopulation":"Asian",
            "category":"2018",
            "total":19
          },
          {
            "id":28,
            "subpopulation":"Asian",
            "category":"2019",
            "total":26
          },
          {
            "id":29,
            "subpopulation":"American Indian",
            "category":"2018",
            "total":103
          },
          {
            "id":30,
            "subpopulation":"American Indian",
            "category":"2019",
            "total":66
          },
          {
            "id":31,
            "subpopulation":"Multiple Races",
            "category":"2018",
            "total":52
          },
          {
            "id":32,
            "subpopulation":"Multiple Races",
            "category":"2019",
            "total":199
          },
          {
            "id":33,
            "subpopulation":"Unknown Race",
            "category":"2018",
            "total":335
          },
          {
            "id":34,
            "subpopulation":"Unknown Race",
            "category":"2019",
            "total":381
          },
          {
            "id":35,
            "subpopulation":"Households",
            "category":"2018",
            "total":1335
          },
          {
            "id":36,
            "subpopulation":"Households",
            "category":"2019",
            "total":1843
          },
          {
            "id":37,
            "subpopulation":"Chronically Homeless",
            "category":"2018",
            "total":387
          },
          {
            "id":38,
            "subpopulation":"Chronically Homeless",
            "category":"2019",
            "total":727
          }
        ];

        this.const_data_for_sheltered_table = [
          {
            "id":1,
            "subpopulation":"Individuals",
            "category":"2018",
            "total":631
          },
          {
            "id":2,
            "subpopulation":"Adults(>=25)",
            "category":"2018",
            "total":415
          },
          {
            "id":3,
            "subpopulation":"Individuals",
            "category":"2019",
            "total":766
          },
          {
            "id":4,
            "subpopulation":"Adults(>=25)",
            "category":"2019",
            "total":484
          },
          {
            "id":5,
            "subpopulation":"Youth(18-24)",
            "category":"2018",
            "total":69
          },
          {
            "id":6,
            "subpopulation":"Youth(18-24)",
            "category":"2019",
            "total":83
          },
          {
            "id":7,
            "subpopulation":"Children(<=17)",
            "category":"2018",
            "total":147
          },
          {
            "id":8,
            "subpopulation":"Children(<=17)",
            "category":"2019",
            "total":199
          },
          {
            "id":9,
            "subpopulation":"Unknown Age",
            "category":"2018",
            "total":0
          },
          {
            "id":10,
            "subpopulation":"Unknown Age",
            "category":"2019",
            "total":0
          },
          {
            "id":11,
            "subpopulation":"Male",
            "category":"2018",
            "total":354
          },
          {
            "id":12,
            "subpopulation":"Male",
            "category":"2019",
            "total":418
          },
          {
            "id":13,
            "subpopulation":"Female",
            "category":"2018",
            "total":272
          },
          {
            "id":14,
            "subpopulation":"Female",
            "category":"2019",
            "total":344
          },
          {
            "id":15,
            "subpopulation":"Transgender",
            "category":"2018",
            "total":4
          },
          {
            "id":16,
            "subpopulation":"Transgender",
            "category":"2019",
            "total":2
          },
          {
            "id":17,
            "subpopulation":"Gender Non-Con",
            "category":"2018",
            "total":1
          },
          {
            "id":18,
            "subpopulation":"Gender Non-Con",
            "category":"2019",
            "total":2
          },
          {
            "id":19,
            "subpopulation":"Unknown Gender",
            "category":"2018",
            "total":0
          },
          {
            "id":20,
            "subpopulation":"Unknown Gender",
            "category":"2019",
            "total":0
          },
          {
            "id":21,
            "subpopulation":"White",
            "category":"2018",
            "total":432
          },
          {
            "id":22,
            "subpopulation":"White",
            "category":"2019",
            "total":515
          },
          {
            "id":23,
            "subpopulation":"Native Hawaiian",
            "category":"2018",
            "total":10
          },
          {
            "id":24,
            "subpopulation":"Native Hawaiian",
            "category":"2019",
            "total":9
          },
          {
            "id":25,
            "subpopulation":"Black",
            "category":"2018",
            "total":133
          },
          {
            "id":26,
            "subpopulation":"Black",
            "category":"2019",
            "total":199
          },
          {
            "id":27,
            "subpopulation":"Asian",
            "category":"2018",
            "total":10
          },
          {
            "id":28,
            "subpopulation":"Asian",
            "category":"2019",
            "total":4
          },
          {
            "id":29,
            "subpopulation":"American Indian",
            "category":"2018",
            "total":22
          },
          {
            "id":30,
            "subpopulation":"American Indian",
            "category":"2019",
            "total":12
          },
          {
            "id":31,
            "subpopulation":"Multiple Races",
            "category":"2018",
            "total":24
          },
          {
            "id":32,
            "subpopulation":"Multiple Races",
            "category":"2019",
            "total":27
          },
          {
            "id":33,
            "subpopulation":"Unknown Race",
            "category":"2018",
            "total":0
          },
          {
            "id":34,
            "subpopulation":"Unknown Race",
            "category":"2019",
            "total":0
          },
          {
            "id":35,
            "subpopulation":"Households",
            "category":"2018",
            "total":471
          },
          {
            "id":36,
            "subpopulation":"Households",
            "category":"2019",
            "total":558
          },
          {
            "id":37,
            "subpopulation":"Chronically Homeless",
            "category":"2018",
            "total":87
          },
          {
            "id":38,
            "subpopulation":"Chronically Homeless",
            "category":"2019",
            "total":77
          }
        ];

      this.table2data = [
        {
          "id":1,
          "subpopulation":"Individuals",
          "category":"Sheltered",
          "total":766
        },
        {
          "id":2,
          "subpopulation":"Individuals",
          "category":"Unsheltered",
          "total":2045
        },
        {
          "id":3,
          "subpopulation":"Individuals",
          "category":"Total Count",
          "total":2811
        },
        {
          "id":4,
          "subpopulation":"Adults",
          "category":"Sheltered",
          "total":484
        },
        {
          "id":5,
          "subpopulation":"Adults",
          "category":"Unsheltered",
          "total":1718
        },
        {
          "id":6,
          "subpopulation":"Adults",
          "category":"Total Count",
          "total":2202
        },
        {
          "id":7,
          "subpopulation":"Youth (18-24)",
          "category":"Sheltered",
          "total":83
        },
        {
          "id":8,
          "subpopulation":"Youth (18-24)",
          "category":"Unsheltered",
          "total":181
        },
        {
          "id":9,
          "subpopulation":"Youth (18-24)",
          "category":"Total Count",
          "total":264
        },
        {
          "id":10,
          "subpopulation":"Children (<=17)",
          "category":"Unsheltered",
          "total":199
        },
        {
          "id":11,
          "subpopulation":"Children (<=17)",
          "category":"Sheltered",
          "total":15
        },
        {
          "id":12,
          "subpopulation":"Children (<=17)",
          "category":"Total Count",
          "total":214
        },
        {
          "id":13,
          "subpopulation":"Unknown Ages",
          "category":"Sheltered",
          "total":0
        },
        {
          "id":14,
          "subpopulation":"Unknown Ages",
          "category":"Unsheltered",
          "total":131
        },
        {
          "id":15,
          "subpopulation":"Unknown Ages",
          "category":"Total Count",
          "total":131
        },
        {
          "id":16,
          "subpopulation":"Households",
          "category":"Sheltered",
          "total":558
        },
        {
          "id":17,
          "subpopulation":"Households",
          "category":"Unsheltered",
          "total":1843
        },
        {
          "id":18,
          "subpopulation":"Households",
          "category":"Total Count",
          "total":2401
        },
        {
          "id":19,
          "subpopulation":"Chronically Homeless",
          "category":"Sheltered",
          "total":77
        },
        {
          "id":20,
          "subpopulation":"Chronically Homeless",
          "category":"Unsheltered",
          "total":727
        },
        {
          "id":21,
          "subpopulation":"Chronically Homeless",
          "category":"Total Count",
          "total":804
        },
        {
          "id":22,
          "subpopulation":"Families with Children",
          "category":"Sheltered",
          "total":77
        },
        {
          "id":23,
          "subpopulation":"Families with Children",
          "category":"Unsheltered",
          "total":5
        },
        {
          "id":24,
          "subpopulation":"Families with Children",
          "category":"Total Count",
          "total":82
        },
        {
          "id":25,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "category":"Sheltered",
          "total":59
        },
        {
          "id":26,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "category":"Unsheltered",
          "total":498
        },
        {
          "id":27,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "category":"Total Count",
          "total":557
        },
        {
          "id":28,
          "subpopulation":"Mental Health Conditions",
          "category":"Sheltered",
          "total":148
        },
        {
          "id":29,
          "subpopulation":"Mental Health Conditions",
          "category":"Unsheltered",
          "total":367
        },
        {
          "id":29,
          "subpopulation":"Mental Health Conditions",
          "category":"Total Count",
          "total":515
        },
        {
          "id":30,
          "subpopulation":"Veterans",
          "category":"Sheltered",
          "total":56
        },
        {
          "id":31,
          "subpopulation":"Veterans",
          "category":"Unsheltered",
          "total":107
        },
        {
          "id":32,
          "subpopulation":"Veterans",
          "category":"Total Count",
          "total":163
        },
      ]

      this.test_data = [
        {
          "id":1,
          "subpopulation": "A",
          "category":"X",
          "total":10
        },
        {
          "id":2,
          "subpopulation": "A",
          "category":"Y",
          "total":20
        },
        {
          "id":3,
          "subpopulation": "B",
          "category":"X",
          "total":30
        },
        {
          "id":4,
          "subpopulation": "B",
          "category":"Y",
          "total":14
        }
      ]

      this.test_data2 = [
        {
          "id":1,
          "subpopulation": "A",
          "category":"2018",
          "total":10
        },
        {
          "id":2,
          "subpopulation": "A",
          "category":"2019",
          "total":20
        },
        {
          "id":3,
          "subpopulation": "B",
          "category":"2018",
          "total":30
        },
        {
          "id":4,
          "subpopulation": "B",
          "category":"2019",
          "total":14
        }
      ]

      this.test_data3 = [
        {
          "id":1,
          "subpopulation": "A",
          "category":"2018",
          "total":10
        },
        {
          "id":2,
          "subpopulation": "A",
          "category":"2019",
          "total":20
        },
        {
          "id":3,
          "subpopulation": "B",
          "category":"2018",
          "total":30
        },
        {
          "id":4,
          "subpopulation": "B",
          "category":"2019",
          "total":14
        },
        {
          "id":5,
          "subpopulation": "A",
          "category":"2020",
          "total":30
        },
        {
          "id":6,
          "subpopulation": "B",
          "category":"2020",
          "total":50
        },
      ]

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

            <PieGraph height = {500}
            url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Gender'
            />

            <PieGraph height = {500}
            url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=households'
            />


            <PieChart2 height = {500}
            url = "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/?search=Ethnicity"
            />


            <h1>Table Version 3</h1>
            <TableComponent3
              data = {this.table2data}
              tableName = "General Sheltered and Unsheltered Table"
              width = {700}
            />

            <h1>Table Version 4</h1>
            <TableComponent4
              data = {this.table2data}
              tableName = "General Sheltered and Unsheltered Table"
              width = {700}
            />
            <br/>
            <TableComponent4
              data = {this.test_data}
              tableName = "Test Table Name 1"
              width = {1000}
            />
            <br/>
            <TableComponent4
              data = {this.test_data2}
              tableName = "Test Table Name 2"
              width = {500}
            />

            <br/>
            <TableComponent4
              data = {this.const_data_for_sheltered_table}
              tableName = "Sheltered Table"
              width = {700}
            />

            <br/>
            <TableComponent4
              data = {this.const_data_for_unsheltered_table}
              tableName = "Unsheltered Table"
              width = {700}
            />

            <br/>
            <TableComponent4
              data = {this.test_data3}
              tableName = "Test Table 3"
              width = {700}
            />

        </div>

        )
    }
}
