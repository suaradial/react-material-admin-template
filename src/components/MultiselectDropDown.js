import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
export default class SelectFieldExampleMultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedValues: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, newSelectedValue)  {
    if (this.state.selectedValues.includes(newSelectedValue)){
      const updatedSelectedValues = this.state.selectedValues.filter( value => value !== newSelectedValue);
      
      this.setState({selectedValues: updatedSelectedValues});
    } else {
      this.setState({ 
        selectedValues: [...this.state.selectedValues , newSelectedValue]
      }); 
    }
  }

  menuItems(selectedValues) {
    return this.props.menuOptions.map((menuOption) => (
      <MenuItem
        key={menuOption}
        checked={selectedValues && this.state.selectedValues.includes(menuOption)}
        value={menuOption}
        primaryText={menuOption}
        insetChildren={true}
      />
    ));
  }

  render() {
    const {selectedValues} = this.state;
    return (
      <Paper>
        <SelectField
          multiple={true}
          hintText = {this.props.hintText}
          value={selectedValues}
          onChange={this.handleChange}
        >
          {this.menuItems(selectedValues)}
        </SelectField>
      </Paper>
    );
  }
}