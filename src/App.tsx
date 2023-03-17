import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { css } from '@emotion/css';
import { useSpring, animated, SpringValue } from "react-spring";

const withReactFC = <P extends object>(StyledComponent: any): React.FC<P> => {
  return (props: P) => <StyledComponent {...props} />;
};

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #282c34;
`;

interface ContainerProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = withReactFC(StyledContainer);

const keyDisplayCss = css`
  position: absolute;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: rgba(75, 192, 192, 0.8);
`;

interface KeyDisplayProps {
  style: {
    left: SpringValue<number>;
    top: SpringValue<number>;
    transform: SpringValue<string>;
  };
  opacity: number;
  children?: React.ReactNode;
}

const KeyDisplay: React.FC<KeyDisplayProps> = ({ style, opacity, children }) => {
  const combinedStyles = { ...style, opacity };
  return (
    <animated.div className={css(keyDisplayCss)} style={combinedStyles}>
      {children}
    </animated.div>
  );
};

interface AnimatedKeyProps {
  keyObj: {
    key: string;
    position: { x: number; y: number };
  };
  index: number;
  totalKeys: number;
}

const AnimatedKey: React.FC<AnimatedKeyProps> = ({ keyObj, index, totalKeys }) => {
  const animationProps = useSpring({
    left: keyObj.position.x,
    top: keyObj.position.y,
    transform: "scale(1.5)",
    opacity: 0.1 + 0.9 * (index / totalKeys),
    config: { tension: 210, friction: 20 },
  });

  return (
    <KeyDisplay key={index} style={animationProps} opacity={0.1 + 0.9 * (index / totalKeys)}>
      {keyObj.key}
    </KeyDisplay>
  );
};

const App = () => {
  const [pressedKeys, setPressedKeys] = useState<Array<{ key: string; position: { x: number; y: number } }>>([]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const isLetter = /^[a-zA-Z]$/.test(event.key);
    if (isLetter) {
      const newPosition = {
        x: Math.floor(Math.random() * (window.innerWidth - 100)),
        y: Math.floor(Math.random() * (window.innerHeight - 100)),
      };
      setPressedKeys((prevState) => [...prevState, { key: event.key, position: newPosition }]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Container>
      {pressedKeys.map((keyObj, index) => (
        <AnimatedKey key={index} keyObj={keyObj} index={index} totalKeys={pressedKeys.length} />
      ))}
    </Container>
  );
  
  };
  
  export default App;