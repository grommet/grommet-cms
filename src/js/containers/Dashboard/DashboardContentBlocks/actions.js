import * as ActionTypes from './constants';

export const blockAdd = () => (
  {
    type: ActionTypes.BLOCK_ADD
  }
);

export const blockRemove = (id) => (
  {
    type: ActionTypes.BLOCK_REMOVE,
    id
  }
);

export const blockEdit = (id) => (
  {
    type: ActionTypes.BLOCK_EDIT,
    id
  }
);

export const blockDuplicate = (id) => ({
  type: ActionTypes.BLOCK_DUPLICATE,
  id
});

export const blockType = (id, blockType) => (
  {
    type: ActionTypes.BLOCK_TYPE,
    id,
    blockType
  }
);

export const blockCancel = () => ({
  type: ActionTypes.BLOCK_CANCEL
});

export const blockSubmit = (id, content) => (
  {
    type: ActionTypes.BLOCK_SUBMIT,
    id,
    content
  }
);

export const blockMoveUp = (id) => (
  {
    type: ActionTypes.BLOCK_MOVE_UP,
    id
  }
);

export const blockSetContentBlockLayout = (id, layout) => ({
  type: ActionTypes.BLOCK_SET_CONTENT_BLOCK_LAYOUT,
  layout,
  id
});

export const blockMoveDown = (id) => (
  {
    type: ActionTypes.BLOCK_MOVE_DOWN,
    id
  }
);

export const blockAddList = (list) => (
  {
    type: ActionTypes.BLOCK_ADD_LIST,
    list
  }
);
