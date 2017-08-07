import { v4 as uuid } from 'uuid';
import {
  BLOCK_ADD, BLOCK_ADD_LIST, BLOCK_REMOVE, BLOCK_EDIT, BLOCK_TYPE,
  BLOCK_SUBMIT, BLOCK_MOVE_UP, BLOCK_MOVE_DOWN, BLOCK_CANCEL,
  BLOCK_SET_CONTENT_BLOCK_LAYOUT, BLOCK_DUPLICATE
} from './constants';
import postPageState from '../DashboardPostPage/state';

const initialState = [];

export function contentBlocks(state = initialState, action) {
  const newBlocks = state.slice(0);
  const blockIndex = (action.id)
    ? newBlocks.findIndex(
      block => block.id === action.id
    )
    : undefined;

  switch (action.type) {
    case BLOCK_DUPLICATE: {
      const newBlock = state[blockIndex];
      return [
        ...state.slice(0, blockIndex),
        {
          ...newBlock,
          id: uuid()
        },
        ...state.slice(blockIndex)
      ];
    }

    case BLOCK_ADD:
      return state.concat({
        id: uuid(),
        layout: postPageState.boxLayoutForm.fields.map(({ name, value }) => ({
          name,
          value
        })),
        edit: true
      });
      break;

    case BLOCK_ADD_LIST:
      const newList = action.list.slice(0);
      return newList;

    case BLOCK_REMOVE:
      newBlocks.splice(blockIndex, 1);
      return newBlocks;
      break;

    case BLOCK_CANCEL:
      return initialState;

    case BLOCK_EDIT:
      newBlocks[blockIndex].edit = true;
      return newBlocks;

    case BLOCK_SET_CONTENT_BLOCK_LAYOUT:
      newBlocks[blockIndex].layout = action.layout;
      return newBlocks;

    case BLOCK_TYPE:
      newBlocks[blockIndex].blockType = action.blockType;
      return newBlocks;

    case BLOCK_SUBMIT:
      newBlocks[blockIndex] = Object.assign(
        {},
        newBlocks[blockIndex],
        action.content
      );
      newBlocks[blockIndex].edit = false;
      return newBlocks;

    case BLOCK_MOVE_UP:
      if (blockIndex - 1 >= 0) {
        const blockToMove = newBlocks[blockIndex];
        newBlocks.splice(blockIndex, 1);
        newBlocks.splice(blockIndex - 1, 0, blockToMove);
        return newBlocks;
      }
      return state;

      break;

    case BLOCK_MOVE_DOWN:
      if (blockIndex + 1 <= state.length - 1) {
        const blockToMove = newBlocks[blockIndex];
        newBlocks.splice(blockIndex, 1);
        newBlocks.splice(blockIndex + 1, 0, blockToMove);
        return newBlocks;
      }
      return state;

      break;

    default:
      return state;
  }
}

export default contentBlocks;
