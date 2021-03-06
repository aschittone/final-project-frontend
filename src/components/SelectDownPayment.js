import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [<MenuItem key={0} value={'Cash'} primaryText={'Cash'} />];
for (let i = 0; i <= 95; i += 1) {
  items.push(<MenuItem value={i} key={i + 1} primaryText={`${i}%`} />);
}

/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */
export default class DropDownMenuLongMenuExample extends Component {
  state = {
    value: "",
  };

  handleChange = (event, index, value) => {
    this.setState({ value });
    this.props.changeDP(event.target.innerText)
  };

  render() {
    return (
      <SelectField
        value={this.state.value}
        onChange={this.handleChange}
        maxHeight={200}
        floatingLabelText="Down Payment"
        floatingLabelStyle={{ color: '#000' }}
        floatingLabelFocusStyle={{ color: '#000' }}
        underlineFocusStyle={{ borderColor: '#000' }}

      >
        {items}
      </SelectField>
    );
  }
}