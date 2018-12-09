import { MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
import { HashingTypes } from '../../../models';

type Props = {
    chosenAlgorithm: string;
    onChange: ((val: string) => any);
};

class AlgorithmChooser extends React.Component<Props> {

    render = () => (
        <div>
            <Select
                value={this.props.chosenAlgorithm}
                onChange={this.handleChange}
            >
                {Object.keys(HashingTypes.Algorithm).map((alg, index) =>
                    <MenuItem
                        key={index}
                        value={alg}
                    >
                        {alg}
                    </MenuItem>
                )}
            </Select>
        </div>
    );

    private handleChange = (event: React.ChangeEvent<any>) => {
        const val = { chosenAlgorithm: event.target.value };
        this.props.onChange(val.chosenAlgorithm);
    }

}

export default AlgorithmChooser;
