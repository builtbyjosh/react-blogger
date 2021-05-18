import JSONPlaceholder from "../APIs/JSONPlaceholder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const userIds = _.uniq(_.map(getState().posts, "usderId"));
  userIds.forEach((id) => dispatch(fetchUser(id)));
};

export const fetchPosts = () => async (dispatch) => {
  const res = await JSONPlaceholder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: res.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const res = await JSONPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: res.data });
};

// shortened version of above
// export const fetchPosts = () => async (dispatch) => {
//   const res = await JSONPlaceholder.get("/posts");
//   dispatch({ type: "FETCH_POSTS", payload: res });
// };

//Bad approach
// export const fetchPosts = async () => {
//   const res = await JSONPlaceholder.get('/posts')
//   return {
//     type: 'FETCH_POSTS',
//     payload: res
//   }
// }
