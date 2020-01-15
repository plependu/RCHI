import React, {Component} from 'react';
import { Header, Table} from 'semantic-ui-react';


class TableComponent2 extends Component{
  constructor(){
    super();

    this.state = {
      chartData : null,
      type_array: [],
      filteredData: [],
      flag: false,
      col_size : null,
      body_function : null,
      test_function : null
    }
  }





  componentDidMount(){
    //Arrange Data

    this.state.chartData = this.props.data;


    var label_array = [];
    var unpopulated_array = [];
    var column_name_array = [];
    var column_size = 0;


    //find all the columns
    for(let i = 0; i < this.state.chartData.length; ++i){
      if(!column_name_array.includes(this.state.chartData[i].type)){

        column_name_array.push(this.state.chartData[i].type);
      }
    }


    column_size = column_name_array.length;

    //fill label_array
    for(let i = 0; i < this.state.chartData.length; ++i){
      if(!label_array.includes(this.state.chartData[i].subpopulation)){
        label_array.push(this.state.chartData[i].subpopulation);
      }
    }

    //fill unpopulated_array
    for(let i = 0; i < label_array.length; ++i){
      var temp = {
        "rowName": label_array[i]
      }
      unpopulated_array.push(temp);
    }

    //dynamically allocate slots
    for(let i = 0; i < unpopulated_array.length; ++i){
      for(let k = 0; k < label_array.length; ++k){
        var slot_name = label_array[k];

        unpopulated_array[i][slot_name] = -1;
      }
    }

    //dynamically clean slots



/*
    //populate unpopulated_arrays
    for(let i = 0; i < this.state.chartData.length; ++i){
      //check if in list1
      if(label_array.includes(this.state.chartData[i].subpopulation)){
        //find it in list2

        for(let j = 0; j < unpopulated_array.length; ++j){
          if(this.state.chartData[i].subpopulation == unpopulated_array[j].rowName){
            //check year
            if(this.state.chartData[i].year == this.state.year1){
              unpopulated_array[j].value1 = this.state.chartData[i].total;
            }
            else if(this.state.chartData[i].year == this.state.year2){
              unpopulated_array[j].value2 = this.state.chartData[i].total;
            }
          }
        }
      }
    }
  */

    //Populate the unpopulated array
    for(let i = 0; i < unpopulated_array.length; ++i){
      for(let k = 0; k < this.state.chartData.length; ++k){
        if(unpopulated_array[i].rowName == this.state.chartData[k].subpopulation){
          unpopulated_array[i][this.state.chartData[k].type] = this.state.chartData[k].total;
        }
      }
    }

    //Clean out the now populated array
    for(let i = 0; i < unpopulated_array.length; ++i){
      for(var key in unpopulated_array[i]){
        if(unpopulated_array[i][key] == -1){
          delete unpopulated_array[i][key];
        }
      }
    }



    this.state.filteredData = unpopulated_array;

    var builder_function = function(it){

      // Object.keys(it).forEach(item=>{
      //   return(
      //     <Table.HeaderCell>{it[item]}</Table.HeaderCell>
      //   );
      // });

      Object.keys(it).map((sub_iterator,sub_idx)=>{
        console.log(sub_iterator)
        console.log(it[sub_iterator])
        return(
          <Table.HeaderCell>{it[sub_iterator]}</Table.HeaderCell>
        );
      })
    }

    var builder_function2 = function(it){

      // Object.keys(it).forEach(item=>{
      //   return(
      //     <Table.HeaderCell>{it[item]}</Table.HeaderCell>
      //   );
      // });

      var value_array = []

      for(var val in it){
        value_array.push(it[val]);
      }

      // console.log(value_array);

      return(
        <div>   //FIXME::Table Body mismatch Table Header 
          {
            value_array.map((iterator,idx)=>{
              return(
                <Table.HeaderCell textAlign='center' width='10000'>{iterator}</Table.HeaderCell>
              )
            })
          }
        </div>
      )
    }



    this.setState(
      {
        type_array: column_name_array,
        filteredData: unpopulated_array,
        flag : true,
        col_size : column_size,
        body_function : builder_function,
        test_function : builder_function2
      }
    );


  }




  render(){
    if(!this.state.flag){
      return(<h3>Loading</h3>);
    }
    else{
    return(
      <div style = {{width: this.props.width}}>
        <Table Cell Structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={this.state.col_size+1} textAlign='center'>
                <Header>
                  {this.props.tableName}
                  <Header.Subheader/>
                </Header>
              </Table.HeaderCell>
            </Table.Row>

            <Table.Row>
            <Table.HeaderCell textAlign='center'>         </Table.HeaderCell>
            {
              this.state.type_array.map( (iterator, idx)=>{
                  return(
                      <Table.HeaderCell textAlign='center'>{iterator}</Table.HeaderCell>
                  );
              })
            }

            </Table.Row>
          </Table.Header>

          <Table.Body>
            {console.log(this.state.filteredData)}
            {
              this.state.filteredData.map((iterator,idx)=>{
                return(
                  <div>
                    <Table.Row>
                      {
                        this.state.test_function(iterator)
                      }
                    </Table.Row>
                  </div>
                )
              })
            }
          </Table.Body>

        </Table>
      </div>
    )
  }
  }
}



export default TableComponent2
