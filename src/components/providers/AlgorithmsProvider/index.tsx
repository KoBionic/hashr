import useAPI from 'hooks/useAPI';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

type AlgorithmsContext = [string[], string, Dispatch<SetStateAction<string>>, string];
const AlgorithmsContext = createContext<AlgorithmsContext>([[], null, () => undefined, null]);

const AlgorithmsProvider: React.FC = ({ children }) => {
  const api = useAPI();
  const { algorithms, defaultAlgorithm } = useMemo(() => api.crypto.getAlgorithms(), []);
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);

  return (
    <AlgorithmsContext.Provider value={[algorithms, algorithm, setAlgorithm, defaultAlgorithm]}>
      {children}
    </AlgorithmsContext.Provider>
  );
};

AlgorithmsProvider.displayName = 'AlgorithmsProvider';

/**
 * Returns the Algorithms context that consists of all algorithms, the selected algorithm,
 * the selected algorithm setter function & the default algorithm.
 */
export function useAlgorithms() {
  return useContext(AlgorithmsContext);
}
export default AlgorithmsProvider;
