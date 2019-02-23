import React, { Component } from 'react'
import Header from './header'
import Inputs from './input'
import Outputs from './output'
import Plot from 'react-plotly.js';
import {remote} from "electron"
import {PythonShell} from 'python-shell'
import path from "path"
import fs from 'fs';

export default class  Run extends Component{
    constructor(props) {
        super(props);
        try {
            fs.statSync(".path");
        } catch(error) {
            this.pythonpath = remote.dialog.showOpenDialog({title: "Please select the Python interpreter.",properties: ['openFile'], filters: [{name: "", "extensions": ["exe"]}]});
            fs.writeFileSync("./.path", this.pythonpath, {encoding:"utf-8"});
        }
        this.pythonPath = fs.readFileSync("./.path", {encoding: "utf-8"});
        this.folderPath = fs.readFileSync(".experiment", {encoding: "utf-8"}).replace(/\r?\n/g, '');
        this.title = this.folderPath.split(path.sep);
        this.title = this.title[this.title.length - 1];
        this.setting = fs.readFileSync(this.folderPath + "/setting.txt", {encoding: "utf-8"}).split('\n');
        this.inputs = this.setting[0].trim().split(',').map(item => item.trim());
        this.state = {defaults: {}, outputs: {}};
        this.defaults  = [];
        try {
            fs.statSync(this.folderPath + "/.defaults");
            let defaults = fs.readFileSync(this.folderPath + "/.defaults", {encoding: "utf-8"});
            this.defaults = JSON.parse(defaults);
        } catch(error) {
            console.log(error)
        }
        for(let i of this.inputs){
            if (this.defaults[i]){
                this.state.defaults[i] = this.defaults[i];
            }
        }
        this.outputs = this.setting[1].trim().split(',').map(item => item.trim());
        for(let i of this.outputs){
            this.state.outputs[i] = 0;
        }
        this.graphs = this.setting[2].trim().split(',').map(item => item.trim());
        this.list = [];
        this.state.revision = 0;
        this.state.layout = {};
        this.state.end = true;
        for(let i of this.graphs){
            this.state.layout[i] = {title: i, datarevision: 0, width: 620, height: 440};
            this.state[i] = {
                x: [],
                y: [],
                mode: 'lines+points',
                marker: {color: 'blue'},
                name: i,
            };

            this.list.push(<Plot
                key={i}
                data={[
                    this.state[i]
                ]}
                layout={this.state.layout[i]}
                revision={this.state.revision}
            />)
        }
        this.updateGraph = this.updateGraph.bind(this);
    };

    updateGraph(message){
        for(let i of this.graphs){
            this.state[i].x.push(message[i.split('/').map(item => item.trim())[0]]);
            this.state[i].y.push(message[i.split('/').map(item => item.trim())[1]]);
        }
    };

    start_measurement(json){
        this.setState({ end: false });
        for(let i of this.graphs){
            this.state[i].x = [];
            this.state[i].y = [];
        }
        let options = {
            pythonPath: this.pythonPath,
            pythonOptions: ['-u'],
            mode: 'json'
        };


        this.pyshell = new PythonShell(this.folderPath + "/measurement.py", options);
        this.pyshell.send(json);

        this.pyshell.on('message', message => {
            this.setState({outputs: message});
            this.updateGraph(message);
            this.setState({revision: this.state.revision + 1});
            for(let i of this.graphs){
                this.state.layout[i].datarevision = this.state.revision + 1
            }
        });

        this.pyshell.end((err,code,signal) => {
            this.setState({ end: true });
            if (err) {
                remote.dialog.showErrorBox("Error", err.stack);
            };
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');
            console.log('finished');
        });
    }

    stop(){
        this.pyshell.terminate();
    }

    render() {
        this.list = [];
        for(let i of this.graphs){
            this.list.push(<Plot
                key={i}
                data={[
                    this.state[i]
                ]}
                layout={this.state.layout[i]}
                revision={this.state.revision}
            />)
        }
        return(
            <div>
                <Header title={this.title}/>
                <div style={{display:"flex", justifyContent: 'center'}}>
                <Inputs key="inputs" msg={this.inputs} defaultvalue={this.state.defaults} end={this.state.end} folder={this.folderPath} start_measurement={this.start_measurement.bind(this)} stop={this.stop.bind(this)}/>
                </div>
                <div style={{display:"flex", justifyContent: 'center'}}>
                    <Outputs msg={this.outputs} result={this.state["outputs"]}/>
                </div>
                {this.list}
            </div>
    );
    }
}
