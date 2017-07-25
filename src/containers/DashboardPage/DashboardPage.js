import React, { Component } from 'react';
import axios from 'axios';
// import MenuItem from 'material-ui/MenuItem';
// import { List, ListItem, makeSelectable } from 'material-ui/List';
// import Paper from 'material-ui/Paper';
// import Checkbox from 'material-ui/Checkbox';
// import Subheader from 'material-ui/Subheader';

import MultiSelectDropDown from '../../components/MultiselectDropDown';

import NewOrders from '../../components/dashboard/NewOrders';
import MonthlySales from '../../components/dashboard/MonthlySales';
import BrowserUsage from '../../components/dashboard/BrowserUsage';
import RecentlyProducts from '../../components/dashboard/RecentlyProducts';
import globalStyles from '../../styles';
import Data from '../../data';
import styles from './styles';



class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dischargeData: [],
      bundleFilterLabels: [],
    }
  }

  componentDidMount() {
      // We'ere gonna want to make the start and end dates come from the UI, not hard coded
      axios({
        url: '/api/reports/discharged_encounter_report?v=1.0&start_date=2016-01-01' +
      '&end_date=2017-06-30&dataset=CMS%20BPCI'
      }).then(
        res => {
          console.log(res.data);
          this.setState({bundleFilterLabels: ['Cardiac Arrythmia', 'Congestive Heart Failure', 'Acute Hygienic Arrest']});
        }
      );
    }
  render(){
  return (
    <div>
      <h3 style={globalStyles.navigation}>Smart Placement / Analytics Dashboard</h3>

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6   col-md-offset-1 col-mlg-offset-1 m-b-15 ">
          <h2 style={styles.title}> Analytics Dashboard </h2>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6   col-md-offset-1 col-mlg-offset-1 m-b-15 ">
            {this.state.bundleFilterLabels.length > 0 && <MultiSelectDropDown menuOptions={this.state.bundleFilterLabels} hintText="Bundle Name"/> }
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3     col-md-offset-1 col-lg-offset-1 m-b-15 ">
          {this.state.bundleFilterLabels.length > 0 &&  <MultiSelectDropDown menuOptions={this.state.bundleFilterLabels} hintText="bundleName"/>}
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6d col-lg-10 col-lg-offset-1 col-md m-b-15">
          <NewOrders data={Data.dashBoardPage.newOrders}/>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-10 col-lg-offset-1 m-b-15">
          <MonthlySales data={Data.dashBoardPage.monthlySales}/>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-10 col-lg-offset-1 m-b-15 ">
          <BrowserUsage data={Data.dashBoardPage.browserUsage}/>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-lg-offset-1 m-b-15 ">
          <RecentlyProducts data={Data.dashBoardPage.recentProducts}/>
        </div>
      </div>
    </div>
  );
  }
}

export default DashboardPage;
