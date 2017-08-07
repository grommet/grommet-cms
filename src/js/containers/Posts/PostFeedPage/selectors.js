import { createSelector } from 'reselect';

export const selectPostFeedPage = () => (state) => state.postFeedPage;

export const selectPosts = createSelector(
  selectPostFeedPage(),
  (postFeedPage) => {
    const posts = postFeedPage.posts;
    if (posts && posts.length > 0) {
      return posts.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return [];
  }
);

export const selectIsLoading = createSelector(
  selectPostFeedPage(),
  (postFeedPage) => postFeedPage.isLoading
);

export const selectError = createSelector(
  selectPostFeedPage(),
  (postFeedPage) => postFeedPage.loadingError
);
