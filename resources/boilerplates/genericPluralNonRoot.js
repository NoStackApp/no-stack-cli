import React from 'react';
import styled from 'styled-components';

import Create__SingularName__Form from '../Create__SingularName__Form';
import __SingularName__ from '../__SingularName__';

const __SingularName__sStyleWrapper = styled.div``;

function __SingularName__s({ __SingularNameLowercase__s, currentTodoId, onUpdate, refetchQueries }) {
  return (
    <__SingularName__sStyleWrapper>
      <Create__SingularName__Form
        currentTodoId={currentTodoId}
        refetchQueries={refetchQueries}
      />

      {__SingularNameLowercase__s.map(__SingularNameLowercase__ => (
        <__SingularName__
          key={__SingularNameLowercase__.instance.id}
          __SingularNameLowercase__={__SingularNameLowercase__.instance}
          onUpdate={onUpdate}
        />
      ))}
    </__SingularName__sStyleWrapper>
  );
}

export default __SingularName__s;
