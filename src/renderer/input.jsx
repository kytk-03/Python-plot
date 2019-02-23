import React from 'react';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import fs from 'fs';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});


class Inputs extends React.Component {
    constructor(props) {
        super(props);
        const { classes, msg, defaultvalue } = this.props;
        this.list = [];
        this.state = {};
        this.state["run"] = this.props.end;

        for(let input of msg){
            this.state[input] = defaultvalue[input];
            this.list.push(<TextField
                key={input}
                required
                id={input}
                label={input}
                defaultValue={this.state[input]}
                className={classes.textField}
                margin="normal"
                variant="filled"
                onChange={(event) => this.onChangeInputs(event, input)}
                />)
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.stopHandler = this.stopHandler.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ run: nextProps.end });
    }

    clickHandler() {
        this.props.start_measurement(this.state);
        this.setState({run: false});
    }

    stopHandler() {
        this.props.stop(this.state);
        this.setState({run: true});
    }

    onChangeInputs(event, input) {
        let state = Object.assign({}, this.state);
        state[input] = event.target.value;
        delete state.run;
        this.setState({[input]: event.target.value});
        fs.writeFileSync(this.props.folder + "/.defaults", JSON.stringify(state), {encoding:"utf-8"});
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div style={{display:"flex", justifyContent: 'center'}}>
                    <form className={classes.container} noValidate autoComplete="on">
                        {this.list}
                    </form>
                </div>
                <div style={{display:"flex", justifyContent: 'center'}}>
                    <Button size="large" style={{background:"dodgerblue", color:"white", marginLeft:"20px", marginRight:"20px"}} onClick={this.clickHandler} disabled={!this.state["run"]}>
                        START
                    </Button>
                    <Button size="large" style={{background:"orangered", color:"white", marginLeft:"20px"}} onClick={this.stopHandler} disabled={this.state["run"]}>
                        STOP
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Inputs);
