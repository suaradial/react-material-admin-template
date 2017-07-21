import React, { Component } from 'react';
// import { cyan600, pink600, purple600, orange60, grey400, grey600, white } from 'material-ui/styles/colors';
import { cyan600, grey600, white } from 'material-ui/styles/colors';

// import Assessment from 'material-ui/svg-icons/action/assessment';
// import Face from 'material-ui/svg-icons/action/face';
// import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
// import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
// import InfoBox from '../components/dashboard/InfoBox';
// import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { typography } from 'material-ui/styles';

import { List, ListItem, makeSelectable } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';

import NewOrders from '../components/dashboard/NewOrders';
import MonthlySales from '../components/dashboard/MonthlySales';
import BrowserUsage from '../components/dashboard/BrowserUsage';
import RecentlyProducts from '../components/dashboard/RecentlyProducts';
import globalStyles from '../styles';
import Data from '../data';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange(event, index) {
      this.setState({
        selectedIndex: index,
      });
    }

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          { this.props.children }
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

const styles = {
    list: {
      height: 'auto',
      maxHeight: '200px',
      overflow: 'scroll',
    },
    subheader: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      backgroundColor: cyan600,
      color: white,
    },
    title: {
      fontSize: 36,
      padding: 10,
      fontWeight: typography.fontWeightLight,
      color: grey600
    }
}
  

const ListExampleSelectable = () => (
  <Paper style={ styles.list }>
    <Subheader style={styles.subheader}> Sua </Subheader>
    <SelectableList defaultValue={3}>
      <ListItem
        value={1}
        primaryText="Select All"
        leftCheckbox={<Checkbox />}
        
      />
      <ListItem
        value={3}
        primaryText="Cardiac Arrythmia"
        leftCheckbox={<Checkbox />}
      />
      <ListItem
        value={4}
        primaryText="Chronic obstructive pulmonary disease, bonchitis, asthma"
        leftCheckbox={<Checkbox />}
      />
      <ListItem
        value={5}
        primaryText="Congestive heart failure"
        leftCheckbox={<Checkbox />}
      />
      <ListItem
        value={5}
        primaryText="Hip & femur procedures except major joint"
        leftCheckbox={<Checkbox />}
      />
      <ListItem
        value={5}
        primaryText="Major joint replacement of the lower extremity"
        leftCheckbox={<Checkbox />}
      />
      <ListItem
        value={5}
        primaryText="Raquel Parrado"
        leftCheckbox={<Checkbox />}
      />
      <ListItem
        value={5}
        primaryText="Raquel Parrado"
        leftCheckbox={<Checkbox />}
      />
      <ListItem
        value={5}
        primaryText="Raquel Parrado"
        leftCheckbox={<Checkbox />}
      />
    </SelectableList>
  </Paper>
);



const DashboardPage = () => {

  return (
    <div>
      <h3 style={globalStyles.navigation}>Smart Placement / Analytics Dashboard</h3>

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6   col-md-offset-1 col-mlg-offset-1 m-b-15 ">
          <h2 style={ styles.title }> Analytics Dashboard </h2>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6   col-md-offset-1 col-mlg-offset-1 m-b-15 ">
          <ListExampleSelectable >
            <MenuItem primaryText="Maps" />
            <MenuItem primaryText="Books" />
            <MenuItem primaryText="Flights" />
            <MenuItem primaryText="Apps" />
          </ListExampleSelectable>
            {/* <InfoBox Icon={ShoppingCart}
                    color={pink600}
                    title="Total Profit"
                    value="1500k" 
          /> */}
        </div>


        {/* <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={ThumbUp}
                   color={cyan600}
                   title="Likes"
                   value="4231"
          />
        </div> */}

        {/* <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={Assessment}
                   color={purple600}
                   title="Sales"
                   value="460"
          />
        </div> */}

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3     col-md-offset-1 col-lg-offset-1 m-b-15 ">
           <ListExampleSelectable /> 
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
};

export default DashboardPage;
