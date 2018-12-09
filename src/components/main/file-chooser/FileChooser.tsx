import { Input, InputLabel } from '@material-ui/core';
import * as bytes from 'bytes';
import * as React from 'react';
import { CommonTypes } from '../../../models';
import * as styles from './FileChooser.css';

type Props = {
    chosenFile: CommonTypes.File;
    compareTo: (comparison: string) => void;
    initialValue: string;
};

class FileChooser extends React.Component<Props> {

    render = () => (
        <div
            className={styles.container}
        >
            <InputLabel>Compare to</InputLabel>
            <Input
                id="comparison"
                onChange={e => this.props.compareTo(e.target.value)}
                value={this.props.initialValue ? this.props.initialValue : ''}
            />
            <InputLabel>Name</InputLabel>
            <Input
                id="filename"
                disabled={this.props.chosenFile ? false : true}
                value={this.props.chosenFile ? this.props.chosenFile.name : ''}
            />
            <InputLabel>Path</InputLabel>
            <Input
                id="filepath"
                disabled={this.props.chosenFile ? false : true}
                value={this.props.chosenFile ? this.props.chosenFile.path : ''}
            />
            <InputLabel>Size</InputLabel>
            <Input
                id="filesize"
                disabled={this.props.chosenFile ? false : true}
                value={this.props.chosenFile ? bytes(this.props.chosenFile.size) : ''}
            />
            <InputLabel>Mimetype</InputLabel>
            <Input
                id="filetype"
                disabled={this.props.chosenFile ? false : true}
                value={this.props.chosenFile ? this.props.chosenFile.type : ''}
            />
            <InputLabel>Last Modified</InputLabel>
            <Input
                id="filelastmodified"
                disabled={this.props.chosenFile ? false : true}
                value={this.props.chosenFile ? new Date(this.props.chosenFile.lastModified).toUTCString() : ''}
            />
        </div >
    );

}

export default FileChooser;
