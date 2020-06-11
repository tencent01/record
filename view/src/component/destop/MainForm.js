import React, {Component} from 'react';
import { Window, TitleBar, Text } from 'react-desktop/macOs';
import {Rnd } from 'react-rnd';
import CkEditorDome from "../tools/CKEditorDome";

class MainForm extends Component {
    render() {
        return (
            <Rnd>
            <Window
                chrome
                height="100%"
                width="100%"
                padding="10px"
            >
                <TitleBar title="untitled text 5" controls/>
                <Text>Hello World</Text>
                <CkEditorDome></CkEditorDome>
            </Window></Rnd>
        );
    }
}

export default MainForm;
