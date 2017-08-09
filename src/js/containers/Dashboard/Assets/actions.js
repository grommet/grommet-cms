import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import qs from 'querystring';
import { debounce } from 'grommet-cms/utils';
import * as ActionTypes from './constants';

export function assetsRequest(showLoading) {
  return {
    type: ActionTypes.ASSETS_REQUEST,
    showLoading
  };
}

export function assetsSuccess(posts: Array<Asset>) {
  return {
    type: ActionTypes.ASSETS_SUCCESS,
    posts
  };
}

export function assetSuccess(posts: Asset) {
  return {
    type: ActionTypes.ASSET_SUCCESS,
    posts
  };
}

export function assetsError(errorMsg) {
  return {
    type: ActionTypes.ASSETS_ERROR,
    error: errorMsg
  };
}

export function assetsClearPosts() {
  return {
    type: ActionTypes.ASSETS_CLEAR_POSTS
  };
}

export function assetsDeleteSuccess() {
  return {
    type: ActionTypes.ASSETS_DELETE_SUCCESS
  };
}

export function assetsCountSuccess(count) {
  return {
    type: ActionTypes.ASSETS_COUNT_SUCCESS,
    count
  };
}

export function assetsPostTypesSuccess(types) {
  return {
    type: ActionTypes.ASSETS_POST_TYPES_SUCCESS,
    types
  };
}

export function assetsPageTypesSuccess(types) {
  return {
    type: ActionTypes.ASSETS_PAGE_TYPES_SUCCESS,
    types
  };
}

export function assetsSetPage(page) {
  return {
    type: ActionTypes.ASSETS_SET_PAGE,
    page
  };
}

export function assetsIncrementPage() {
  return function (dispatch, getState) {
    const { currentPage } = getState().assets;
    debounce(
      dispatch(
        assetsSetPage(currentPage + 1)
      ),
      10000,
      true
    );
  };
}

// Create Asset.
export function submitAsset(data, forwardWhenDone = true) {
  const endPoint = (!data.id)
    ? 'file/create'
    : `file/edit/${data.id}`;
  const formData = new FormData();

  for (const name in data) { // eslint-disable-line
    formData.append(name, data[name]);
  }
  return (dispatch, getState) => {
    const { url } = getState().api;

    dispatch(assetsRequest());
    return fetch(`${url}/${endPoint}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
      headers: {
        Accept: 'application/json, */*'
      }
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
            console.log('dispatching error:', status, statusText, json);
            dispatch(assetsError(statusText));
          } else {
            dispatch(assetsSuccess(json));
            if (forwardWhenDone) browserHistory.push('/dashboard/assets');
          }
        },
        (err) => {
          // dispatch app error
          console.log(err);
          dispatch(assetsError('There was an error processing your request.'));
        }
      );
  };
}

// Get Assets list.
// This route is auth protected to avoid publicly listing a site's full list
// of resources/assets.
export function getAssets(page, showLoading = true, pageId = '', searchTerm = '', ascending = false, orderBy = 'createdAt') {
  return (dispatch, getState) => {
    if (showLoading) {
      dispatch(assetsRequest());
    }
    const { url } = getState().api;
    const { perPage } = getState().assets;
    const urlComponents = {
      page,
      limit: perPage,
      pageId,
      searchTerm,
      orderBy,
      ascending
    };
    const query = qs.stringify(urlComponents);
    const uri = `${url}/files?${query}`;
    return fetch(uri, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
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
            dispatch(assetsError(text));
          } else if (page > 1) {
            // add the assets to the end of the list
            dispatch(assetsSuccess(json));
          } else {
            // replace the assets
            dispatch(assetSuccess(json));
          }
        },
        () => {
          // Switch this out for Dashboard error.
          dispatch(assetsError('There was an error processing your request.'));
        }
      );
  };
}

// Delete asset.
export function deleteAsset(id) {
  return (dispatch, getState) => {
    dispatch(assetsRequest());
    const { url } = getState().api;
    fetch(`${url}/file/${id}/delete`, {
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
            dispatch(assetsError(text));
          } else {
            // Refresh posts.
            dispatch(getAssets());
            dispatch(assetsDeleteSuccess());
          }
        },
        () => {
          // Switch this out for Dashboard error.
          dispatch(assetsError('There was an error processing your request.'));
        }
      );
  };
}

export function getAssetsTotalCount(pageId = '', searchTerm = '', showLoading = false) {
  return (dispatch, getState) => {
    if (showLoading) {
      dispatch(assetsRequest());
    }
    const { url } = getState().api;
    const urlComponents = {
      pageId,
      searchTerm
    };
    const query = qs.stringify(urlComponents);
    const uri = `${url}/assets-count?${query}`;
    return fetch(uri, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then((json) => {
        dispatch(assetsCountSuccess(json.total));
      })
      .catch(() => {
        dispatch(assetsError('There was an error processing your request.'));
      });
  };
}

export function getAssetsPostTypes() {
  return (dispatch, getState) => {
    dispatch(assetsRequest());
    const { url } = getState().api;
    return fetch(`${url}/pages`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then((json) => {
        dispatch(assetsPostTypesSuccess(json));
      })
      .catch(() => {
        dispatch(assetsError('There was an error processing your request.'));
      });
  };
}

// Get Asset
export function getAsset(id) {
  return (dispatch, getState) => {
    dispatch(assetsRequest());
    const { url } = getState().api;
    return fetch(`${url}/file?id=${id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
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
            dispatch(assetsError(text));
          } else {
            dispatch(assetSuccess(json));
          }
        },
        () => {
          // Switch this out for Dashboard error.
          dispatch(assetsError('There was an error processing your request.'));
        }
      );
  };
}
