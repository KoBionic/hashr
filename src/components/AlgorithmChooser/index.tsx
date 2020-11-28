import { MenuItem, Select } from '@material-ui/core';
import { useAlgorithms } from 'components/providers/AlgorithmsProvider';
import React, { ChangeEvent } from 'react';

const AlgorithmChooser: React.FC = () => {
  const [algorithms, algorithm, setAlgorithm, defaultAlgorithm] = useAlgorithms();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setAlgorithm(e.target.value);
  return (
    <Select defaultValue={defaultAlgorithm || ''} onChange={handleChange} value={algorithm}>
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
