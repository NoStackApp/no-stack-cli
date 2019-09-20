import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE_ACTION } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE___SingularForRelationshipAllCaps___ACTION_ID__ACTION_IDS_FOR_SINGLE_CHILDREN__ } from '../../../config';

// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
`;

const Button = styled.button`
  margin-left: 1em;
`;

function __SingularName__CreationForm({ __SingularParentName__Id, create__SingularName____SINGLE_CHILDREN_PARAMS__, onAdd }) {
  const [ __SingularNameLowercase__Value, update__SingularName__Value ] = useState('');
  const [ loading, updateLoading ] = useState(false);

  function handleChange(e) {
    update__SingularName__Value(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!__SingularNameLowercase__Value) {
      return;
    }

    updateLoading(true);

    const create__SingularName__Response = await create__SingularName__({
      variables: {
        actionId: CREATE___SingularForRelationshipAllCaps___ACTION_ID ,
        executionParameters: JSON.stringify({
          parentInstanceId: __SingularParentName__Id,
          value: __SingularNameLowercase__Value,
        }),
        unrestricted: false,
      },
      update: onAdd(),
    });

    const new__SingularName__Data = JSON.parse(create__SingularName__Response.data.ExecuteAction);

    __SINGLE_CHILDREN_CREATION_CODE__

    update__SingularName__Value('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Form>
      <label htmlFor="__SingularNameLowercase__-value">
        __SingularName__:
        <input
          id="__SingularNameLowercase__-value"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={__SingularNameLowercase__Value}
          disabled={loading}
        />
      </label>
      <Button type="submit"  disabled={loading}  onClick={handleSubmit}>
        {
          loading
            ? 'Creating __SingularName__...'
            : 'Create __SingularName__'
        }
      </Button>
    </Form>
  );
}

export default compose(
  graphql(EXECUTE_ACTION, { name: 'create__SingularName__' }),__SINGLE_CHILDREN_COMPOSE_STATEMENTS__
)(__SingularName__CreationForm);
