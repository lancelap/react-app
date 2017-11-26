import { SubmissionError, reset } from 'redux-form';
import { replace } from 'react-router-redux';
import { auth, db } from '.././firebase';
import { INCREMENT, SIGNOUT, SIGNIN, START, FAIL, SUCCESS, LOAD_ARTICLES, DELITE_ARTICLE } from '../actionTypes';

export function increment() {
  return {
    type: INCREMENT,
  };
}

export function signIn(userInfo) {
  return {
    type: SIGNIN,
    payload: { userInfo },
  };
}

export function signOut() {
  return {
    type: SIGNOUT,
  };
}

export function changeUserState() {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(dispatch(signIn(user)));
      } else {
        dispatch(dispatch(signOut));
      }
    });
  };
}

export const loadArticles = () => {
  const ref = db.ref('post-list');
  return (dispatch) => {
    dispatch({
      type: LOAD_ARTICLES + START,
    });
    ref.on('value', (snapshot) => {
      const snapshotValue = snapshot.val();
      setTimeout(() => {
        dispatch({
          type: LOAD_ARTICLES + SUCCESS,
          response: snapshotValue,
        });
      }, 1000);
    }, (error) => {
      dispatch({
        type: LOAD_ARTICLES + FAIL,
        response: error,
      });
    });
  };
};

export const deleteArticle = (id) => {
  const ref = db.ref('post-list');
  return (dispatch) => {
    dispatch({
      type: DELITE_ARTICLE,
      payload: { id },
    });
    ref.child(id).remove();
  };
};

export const submit = values => (dispatch) => {
  const { email, password } = values;
  return auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(reset('signup'));
    })
    .catch((error) => {
      dispatch(reset('signup'));
      throw new SubmissionError({ _error: error.message });
    });
};

export const submitSignOut = () => (dispatch) => {
  auth.signOut()
    .then(() => {
      dispatch(signOut);
    })
    .then(() => {
      dispatch(replace('/'));
    })
    .catch((error) => {
      throw new SubmissionError({ _error: error.message });
    });
};

export function submitSignIn(values) {
  return (dispatch) => {
    const { email, password } = values;
    return auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(signIn);
      })
      .then(() => {
        dispatch(reset('signin'));
      })
      .then(() => {
        dispatch(replace('/'));
      })
      .catch((error) => {
        dispatch(reset('signin'));
        throw new SubmissionError({ _error: error.message });
      });
  };
}

export function addPostAction(values) {
  const { title, subject, uid, form } = values;
  return (dispatch) => {
    const postListRef = db.ref('post-list');
    const newPostRef = postListRef.push();
    return newPostRef.set({ title, subject, uid })
      .then(() => {
        dispatch(reset(form));
      })
      .catch((error) => {
        dispatch(reset(form));
        throw new SubmissionError({ _error: error.message });
      });
  };
}
