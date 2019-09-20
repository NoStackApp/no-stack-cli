import React from 'react';
import styled from 'styled-components';
import './App.css';
import { NoStackConsumer, LoginForm } from '@nostack/no-stack';

import NavBar from './components/NavBar';
import __TopComponentName__ from './components/__SourceName__/__TopComponentName__';

const Wrapper = styled.div`
  padding: 5em 5em;
  min-width: 480px;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin: 0.5em;
  }
`;

const App = () => (
  <>
    <NavBar />
    <Wrapper className="App">
      <NoStackConsumer>
        {({ loading, currentUser }) => {
          if (loading) return null;

          if (!currentUser) {
            return (
              <LoginWrapper>
                <div>Please Log In</div>
                <div><LoginForm /></div>
              </LoginWrapper>
            );
          }

          return (
            <__TopComponentName__ __TopComponentPropSetting__ />
          );
        }}
      </NoStackConsumer>
    </Wrapper>
  </>
);

export default App;
