import React from 'react';

const Compose: React.FC<ComposeProps> = ({ children, components = [] }) => {
  return (
    <>
      {components.reduceRight((acc, c) => {
        const Component = typeof c === 'function' ? c : c[0];
        const props = (typeof c === 'object' && c[1]) || {};
        return <Component {...props}>{acc}</Component>;
      }, children)}
    </>
  );
};

Compose.displayName = 'Compose';

export type ComposeProps<C extends React.ComponentType = any> = {
  components: (React.ComponentType | [C, React.ComponentProps<C>])[];
};
export default Compose;
