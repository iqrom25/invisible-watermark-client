import React from "react";

export default function useCustomContext(){
    const [size, setSize] = React.useState();
    const [dimension, setDimension] = React.useState();

    const value = React.useMemo(
        () => ({
          size,
          setSize,
          dimension,
          setDimension
        }),
        [dimension, size],
      );
    
      return {
        value,
      };
}