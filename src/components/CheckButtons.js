import React, { Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

class CheckButtons extends Component {
  state = {};

  render() {
    let arrayOfRecipients = this.props.bookMessages.map(message => {
      return message.recipient.username !== this.props.username
        ? message.recipient.username
        : null;
    });

    let arrayOfSenders = this.props.bookMessages.map(message => {
      return message.sender.username !== this.props.username
        ? message.sender.username
        : null;
    });

    let mergedArrayOfDuplicates = arrayOfRecipients.concat(arrayOfSenders);
    let mergedArray = Array.from(new Set(mergedArrayOfDuplicates)).filter(
      item => item !== null
    );

    return (
      <div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="position"
            name="position"
            onChange={this.props.handleSelectionOfRecipient}
            row
          >
            {mergedArray.map(username => {
              return (
                <FormControlLabel
                  value={username}
                  control={<Radio color="primary" />}
                  label={username}
                  labelPlacement="bottom"
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default CheckButtons;
