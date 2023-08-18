import { useContext, useEffect, useState } from 'react';
import {
  editProfile,
  fetchUserFriends,
  register,
  userLogin,
  getPosts,
} from '../api';
import jwt from 'jwt-decode';
import { AuthContext, PostsContext } from '../providers';
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemfromLocalStorage,
} from '../utils';
export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemfromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      if (userToken) {
        const user = jwt(userToken);
        const response = await fetchUserFriends();
        let friends = [];
        if (response.success) {
          friends = response.data.friends;
        }
        setUser({
          ...user,
          friends,
        });
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);
    console.log('response', response);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);
    console.log(response);
    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const logout = (email, password) => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const updateUserFriends = (addFriend, friend) => {
    console.log('Friends , ', friend);
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }

    const newFriends = user.friends.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );
    setUser({
      ...user,
      friends: newFriends,
    });
  };

  return {
    user,
    signup,
    login,
    logout,
    loading,
    updateUser,
    updateUserFriends,
  };
};

export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log(response.data);
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
      console.log('response', response);
    };
    fetchPosts();
  }, []);

  const addPostToState = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };
  const addComment = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });

    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
  };
};
