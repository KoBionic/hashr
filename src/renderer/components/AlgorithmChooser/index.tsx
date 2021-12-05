import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { ChangeEvent } from 'react';
import { useAlgorithms } from 'renderer/components/providers/AlgorithmsProvider';

const AlgorithmChooser: React.FC = () => {
  const [algorithms, algorithm, setAlgorithm, defaultAlgorithm] = useAlgorithms();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setAlgorithm(e.target.value);

  return (
    <Select
      defaultValue={defaultAlgorithm || ''}
      onChange={handleChange}
      value={algorithm}
      variant="standard"
    >
      {algorithms.map(algorithm => (
        <MenuItem key={algorithm} value={algorithm || ''}>
          {algorithm.toUpperCase()}
        </MenuItem>
      ))}
    </Select>
  );
};

AlgorithmChooser.displayName = 'AlgorithmChooser';

export default AlgorithmChooser;
