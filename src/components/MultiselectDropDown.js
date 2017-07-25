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

  handleChange(event, index, updatedSelectedValues)  {
    this.setState({selectedValues: updatedSelectedValues});
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