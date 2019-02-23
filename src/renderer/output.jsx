import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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


class Outputs extends React.Component {
    constructor(props) {
        super(props);
        const { result, classes, msg } = props;
        this.list = [];
        for(let i of msg) {
            this.list.push(<TextField
                key={i}
                id={i}
                label={i}
                defaultValue={result[i]}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                InputProps={{
                    readOnly: true,
                }}
            />);
        }
    }

    render() {
        const { result, msg, classes } = this.props;
        this.list = [];
        for(let i of msg) {
            this.list.push(<TextField
                key={i}
                id={i}
                label={i}
                value={result[i]}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                InputProps={{
                    readOnly: true,
                }}
            />);
        }
        return (
            <form className={classes.container} noValidate autoComplete="off">
                {this.list}
            </form>
        );
    }
}


export default withStyles(styles)(Outputs);