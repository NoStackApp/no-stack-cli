import React, {useState} from 'react';
import styled from 'styled-components';
import {EXECUTE_ACTION} from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import {graphql} from '@apollo/react-hoc';

import {UPDATE___SingularForRelationshipAllCaps___ACTION_ID, DELETE___SingularForRelationshipAllCaps___ACTION_ID} from '../../../config';
import {__SingularNameAllCaps___FRAGMENT} from '../../source-props/fragments';

__CHILDREN_IMPORT_LIST__

// add styling here
const __SingularName__StyleWrapper = styled.div`
  margin: 2em 1em;
  padding: 1.5em;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
`;

const Row = styled.div`
  margin: 1em 0;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${props => props.hoverColor || '#000000'};
  }
`;

const DeleteMenu = styled.div`
  color: red;
  margin: 1em;
  padding: 1em;
  border: 1px solid #eeeeee;
`;

function __SingularName__({__SingularNameLowercase__, parentId, updateInstance, deleteInstance, onUpdate, onDelete}) {
  __CHILDREN_CONSTANT_DECLARATIONS__
  const [__SingularNameLowercase__Value, update__SingularName__Value] = useState(__SingularNameLowercase__.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [ isDeleteMode, updateIsDeleteMode ] = useState(false);
  const [ isDeleting, updateIsDeleting ] = useState(false);

  function handle__SingularName__ValueChange(e) {
    update__SingularName__Value(e.target.value);
  }

  async function handle__SingularName__ValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE___SingularForRelationshipAllCaps___ACTION_ID,
        executionParameters: JSON.stringify({
          value: __SingularNameLowercase__Value,
          instanceId: __SingularNameLowercase__.id,
        }),
        update: onUpdate(__SingularNameLowercase__.id, __SingularNameAllCaps___FRAGMENT),
      },
    });

    updateIsEditMode(false);
    updateIsSaving(false);
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE___SingularForRelationshipAllCaps___ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: __SingularNameLowercase__.id,
          }),
        },
        update: onDelete(__SingularNameLowercase__.id),
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }

  return (
    <__SingularName__StyleWrapper isDeleting={isDeleting}>
      {isEditMode ?
        (
          <>
            <label htmlFor={__SingularNameLowercase__.id}>
              __SingularName__ Value:
              <input
                id={__SingularNameLowercase__.id}
                type="text"
                value={__SingularNameLowercase__Value}
                onChange={handle__SingularName__ValueChange}
                disabled={isSaving}
              />
            </label>
            <Button
              type="button"
              hoverColor="#00FF00"
              onClick={handle__SingularName__ValueSave}
              disabled={isSaving}
            >
              &#10003;
            </Button>
            <Button
              type="button"
              hoverColor="#FF0000"
              onClick={() => updateIsEditMode(false)}
              disabled={isSaving}
            >
              &#10005;
            </Button>
            <Button
              type="button"
              onClick={() => updateIsDeleteMode(true)}
            >
              &#128465;
            </Button>
          </>
        ) :
        (
          <>
            {__SingularNameLowercase__Value}
            {isDeleteMode ? (
                <DeleteMenu>
                  Delete?
                  <Button
                    type="button"
                    hoverColor="#00FF00"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    &#10003;
                  </Button>
                  <Button
                    type="button"
                    hoverColor="#FF0000"
                    onClick={() => updateIsDeleteMode(false)}
                    disabled={isDeleting}
                  >
                    &#10005;
                  </Button>
                </DeleteMenu>
              ) :
              (
                <>
                  <Button
                    type="button"
                    onClick={() => updateIsEditMode(true)}
                  >
                    &#9998;
                  </Button>
                  <Button
                    type="button"
                    onClick={() => updateIsDeleteMode(true)}
                  >
                    &#128465;
                  </Button>
                </>
              )
            }

            __CHILDREN_BODY_LIST__
          </>
        )
      }
    </__SingularName__StyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE_ACTION, { name: 'updateInstance' }),
  graphql(EXECUTE_ACTION, { name: 'deleteInstance' })
)(__SingularName__);
