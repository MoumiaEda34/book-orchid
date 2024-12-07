import { loginStart, loginSuccess, loginFailure } from './authSlice';

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart()); // Start loading state
  
  try {
    // Fetch all users from the backend (mocked here with localhost URL)
    const response = await fetch('http://localhost:8000/user');
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const users = await response.json(); // Parse the user data

    // Match the user based on email and check the password
    const matchedUser = users.find(
      (user) =>
        user.email === credentials.email && user.password === credentials.password
    );

    if (matchedUser) {
      // Dispatch login success with matched user data
      dispatch(
        loginSuccess({
          user: matchedUser,
        })
      );
    } else {
      // Dispatch login failure if no match is found
      dispatch(
        loginFailure({
          error: 'Invalid email or password',
        })
      );
    }
  } catch (error) {
    // Dispatch failure in case of any error (e.g., network issues)
    dispatch(
      loginFailure({
        error: error.message,
      })
    );
  }
};
