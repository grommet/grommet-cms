import fetch from 'isomorphic-fetch';
import * as ActionTypes from './constants';

export function postsRequest() {
  return {
    type: ActionTypes.POSTS_REQUEST
  };
}

export function postsSuccess(posts) {
  return {
    type: ActionTypes.POSTS_SUCCESS,
    posts
  };
}

export function postSuccess(post) {
  return {
    type: ActionTypes.POST_SUCCESS,
    post
  };
}

export function postsError(errorMsg) {
  return {
    type: ActionTypes.POSTS_ERROR,
    error: errorMsg
  };
}

export function postDeleteSuccess() {
  return {
    type: ActionTypes.POSTS_DELETE_SUCCESS
  };
}

export function setPost(post) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.SET_POST,
      post
    });
  };
}

export const postClearError = () => ({
  type: ActionTypes.POST_CLEAR_ERROR
});

export const postDeleteSection = index => ({
  type: ActionTypes.POST_DELETE_SECTION,
  index
});

export const postAddSection = section => ({
  type: ActionTypes.POST_ADD_SECTION,
  ...section
});

export const postEditSection = (section, index) => ({
  type: ActionTypes.POST_EDIT_SECTION,
  ...section,
  index
});

export const postDuplicateSection = index => ({
  type: ActionTypes.POST_DUPLICATE_SECTION,
  index
});

export const postEditOrAddSection = (section, index) => (dispatch) => {
  if (index !== null) {
    dispatch(postEditSection(section, index));
  } else {
    dispatch(postAddSection(section));
  }
};

export const postSetContentBlocks = (contentBlocks, index) => ({
  type: ActionTypes.POST_SET_CONTENT_BLOCKS,
  contentBlocks,
  index
});

export const postRemoveUnusedContentBlocksFromSection = index => ({
  type: ActionTypes.POST_REMOVE_UNUSED_CONTENT_BLOCKS,
  index
});

export const postMoveSectionUp = index => ({
  type: ActionTypes.POST_MOVE_UP_SECTION,
  index
});

export const postMoveSectionDown = index => ({
  type: ActionTypes.POST_MOVE_DOWN_SECTION,
  index
});

// Get posts.
export function getPosts(page = 0, type = '') {
  return (dispatch, getState) => {
    dispatch(postsRequest());
    const { url } = getState().api;
    return fetch(`${url}/posts?type=${type}&page=${page}`, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          statusText: response.statusText,
          json
        })
        ))
      .then(
        ({ status, statusText, json }) => {
          if (status >= 400) {
            const text = statusText;
            dispatch(postsError(text));
          } else {
            dispatch(postsSuccess(json));
          }
        },
        () => {
          // Switch this out for Dashboard error.
          dispatch(postsError('There was an error processing your request.'));
        }
      );
  };
}

// Delete post.
export function deletePost(post) {
  return (dispatch, getState) => {
    dispatch(postsRequest());
    const { url } = getState().api;
    fetch(`${url}/post/${post._id}/delete`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            const text = statusText;
            dispatch(postsError(text));
          } else {
            // Refresh posts.
            dispatch(getPosts(0, post._type));
            dispatch(postDeleteSuccess());
          }
        },
        () => {
          // Switch this out for Dashboard error.
          dispatch(postsError('There was an error processing your request.'));
        }
      );
  };
}

// Get single post.
export function getPost(id, title) {
  return (dispatch, getState) => {
    dispatch(postsRequest());
    const { url: apiUrl } = getState().api;
    const url = (!title)
      ? `${apiUrl}/post/${id}`
      : `${apiUrl}/post/title/${title}`;

    return fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          statusText: response.statusText,
          json
        })
        ))
      .then(
        ({ status, statusText, json }) => {
          if (status >= 400) {
            const text = statusText;
            dispatch(postsError(text));
          } else {
            dispatch(postSuccess(json));
          }
        },
        () => {
          // dispatch app error
          dispatch(postsError('There was an error processing your request.'));
        }
      );
  };
}

// Create post.
export function submitPost(post) {
  const endPoint = ((post._id && post._id === '') || !post._id)
    ? 'post/create'
    : `post/${post._id}`;

  return (dispatch, getState) => {
    dispatch(postsRequest());
    const { url } = getState().api;
    return fetch(`${url}/${endPoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(post)
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            dispatch(postsError(statusText));
          } else {
            dispatch(postSuccess(post));
          }
        },
        () => {
          // dispatch app error
          dispatch(postsError('There was an error processing your request.'));
        }
      );
  };
}

export function updatePost(post) {
  const endPoint = `post/${post._id}`;

  return (dispatch, getState) => {
    dispatch(postsRequest());
    const { url } = getState().api;
    return fetch(`${url}/${endPoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(post)
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            dispatch(postsError(statusText));
          } else {
            dispatch(getPosts(0, post._type));
          }
        },
        () => {
          // dispatch app error
          dispatch(postsError('There was an error processing your request.'));
        }
      );
  };
}
