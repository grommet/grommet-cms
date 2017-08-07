import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  posts: [],
  post: {}
};

function postSectionsReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.POST_DUPLICATE_SECTION:
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index]
        },
        ...state.slice(action.index)
      ];
    case ActionTypes.POST_REMOVE_UNUSED_CONTENT_BLOCKS:
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          contentBlocks: state[action.index].contentBlocks
            .map((item) => ({
              ...item,
              edit: false
            }))
        },
        ...state.slice(action.index + 1)
      ];
    case ActionTypes.POST_SET_CONTENT_BLOCKS:
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          contentBlocks: action.contentBlocks
        },
        ...state.slice(action.index + 1)
      ];
    case ActionTypes.POST_ADD_SECTION:
      return [
        ...state,
        {
          name: action.name,
          id: action.id,
          layout: action.layout,
          order: state.length || 0,
          contentBlocks: []
        }
      ];
    case ActionTypes.POST_DELETE_SECTION:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    case ActionTypes.POST_MOVE_UP_SECTION:
      return [
        ...state.slice(0, action.index - 1),
        {
          ...state[action.index - 1],
          order: action.index
        },
        {
          ...state[action.index],
          order: action.index - 1
        },
        ...state.slice(action.index + 1)
      ];
    case ActionTypes.POST_MOVE_DOWN_SECTION:
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          order: action.index + 1
        },
        {
          ...state[action.index + 1],
          order: action.index
        },
        ...state.slice(action.index + 2)
      ];
    case ActionTypes.POST_EDIT_SECTION:
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          name: action.name,
          id: action.id,
          layout: action.layout
        },
        ...state.slice(action.index + 1)
      ];
    default: return state;
  }
}

function posts(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.POST_DUPLICATE_SECTION:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.POST_REMOVE_UNUSED_CONTENT_BLOCKS:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.POST_SET_CONTENT_BLOCKS:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.POST_CLEAR_ERROR:
      return {
        ...state,
        error: ''
      };
    case ActionTypes.POST_EDIT_SECTION:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.POST_ADD_SECTION:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.POST_DELETE_SECTION:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.POST_MOVE_UP_SECTION:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.POST_MOVE_DOWN_SECTION:
      return {
        ...state,
        post: {
          ...state.post,
          sections: postSectionsReducer(state.post.sections, action)
        }
      };
    case ActionTypes.SET_POST:
      return {
        ...state,
        post: action.post
      };
    case ActionTypes.POSTS_REQUEST:
      return {
        ...state,
        request: true,
        posts: []
      };
    case ActionTypes.POSTS_SUCCESS:
      return {
        ...state,
        request: false,
        error: '',
        posts: action.posts,
        post: action.post
      };
    case ActionTypes.POST_SUCCESS:
      return {
        ...state,
        request: false,
        error: '',
        post: action.post
      };
    case ActionTypes.POSTS_ERROR:
      return {
        ...state,
        request: false,
        error: action.error
      };
    case ActionTypes.POSTS_DELETE_SUCCESS:
      return {
        ...state,
        request: false,
        error: ''
      };
    default:
      return state;
  }
}

export default posts;
