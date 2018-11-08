/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "../components/Table";
import HTTP from "../axios";

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 3}px`
  },
  heroSearchBar: {
    maxWidth: 900,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  heroTable: {
    maxWidth: 1100,
    margin: "0 auto"
  },
  button: {
    marginTop: 16,
    padding: 16
  },
  textField: {
    width: 500
  },
  selectField: {
    width: 200
  },
  formControl: {
    minWidth: 120
  }
});

class Index extends React.Component {
  state = {
    name: "",
    country: "",
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  handleChangeName = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault(); // this will stop refresh the page when you click button
    console.log(this.state.name, this.state.country);
    axios
      .get(`/api/google?q=${this.state.name}&ln=${this.state.country}`)
      .then(response => {
        console.log(response.data);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header />
        <main>
          <form onSubmit={this.handleSubmit}>
            {/* Hero unit */}
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Rank
                </Typography>
              </div>
              <div className={classes.heroSearchBar}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <TextField
                      id="outlined-name"
                      label="Name"
                      className={classes.textField}
                      value={this.state.name}
                      onChange={this.handleChangeName("name")}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      margin="normal"
                    >
                      <InputLabel
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-country-simple"
                      >
                        Country
                      </InputLabel>
                      <Select
                        value={this.state.country}
                        onChange={this.handleChange}
                        className={classes.selectField}
                        input={
                          <OutlinedInput
                            labelWidth={this.state.labelWidth}
                            name="country"
                            id="outlined-country-simple"
                          />
                        }
                      >
                        <MenuItem value="us">United States</MenuItem>
                        <MenuItem value="in">India</MenuItem>
                        <MenuItem value="ca">Canada</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      margin="normal"
                      type="submit"
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </form>
          <div className={classes.heroTable}>
            <Table />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
