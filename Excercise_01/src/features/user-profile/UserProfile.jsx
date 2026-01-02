/**
 * UserProfile Component - Sử dụng useReducer với FSM Pattern
 * 
 * Tính năng:
 * - Fetch user profile data
 * - Xử lý loading, success, error states
 * - Cho phép retry khi có lỗi
 */

import { useReducer, useEffect } from 'react';
import {
  userReducer,
  initialState,
  fetchInit,
  fetchSuccess,
  fetchFailure,
} from './userReducer';

/**
 * Mock API call để mô phỏng fetch dữ liệu
 * @param {boolean} shouldFail - Có nên fail không (để test error case)
 */
const mockFetchUserData = async (shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to fetch user data. Network error.'));
      } else {
        resolve({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Senior Frontend Engineer',
          avatar: 'https://i.pravatar.cc/150?img=1',
          joinDate: '2020-01-15',
        });
      }
    }, 2000); // Simulate 2s network delay
  });
};

export function UserProfile() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  /**
   * Effect: Fetch user data khi component mount
   */
  useEffect(() => {
    // Chỉ fetch nếu state là idle (prevent duplicate fetches)
    if (state.status !== 'idle') {
      return;
    }

    let isMounted = true;

    const loadUserData = async () => {
      dispatch(fetchInit());

      try {
        const userData = await mockFetchUserData(false);
        if (isMounted) {
          dispatch(fetchSuccess(userData));
        }
      } catch (error) {
        if (isMounted) {
          dispatch(fetchFailure(error.message));
        }
      }
    };

    loadUserData();

    // Cleanup: Set flag để tránh state update trên unmounted component
    return () => {
      isMounted = false;
    };
  }, [state.status]);

  /**
   * Handler: Retry fetch khi có lỗi
   */
  const handleRetry = () => {
    dispatch(fetchInit());
  };

  // ==================== RENDER STATES ====================

  // Loading state
  if (state.status === 'loading') {
    return (
      <div className="user-profile loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading user profile...</p>
      </div>
    );
  }

  // Resolved state - Display user data
  if (state.status === 'resolved') {
    const { data } = state;
    return (
      <div className="user-profile resolved-container">
        <div className="profile-card">
          <img src={data.avatar} alt={data.name} className="avatar" />
          <div className="profile-info">
            <h2 className="name">{data.name}</h2>
            <p className="role">{data.role}</p>
            <p className="email">
              <strong>Email:</strong> {data.email}
            </p>
            <p className="join-date">
              <strong>Joined:</strong> {new Date(data.joinDate).toLocaleDateString()}
            </p>
            <p className="status-badge success">✓ Profile loaded successfully</p>
          </div>
        </div>
      </div>
    );
  }

  // Rejected state - Display error
  if (state.status === 'rejected') {
    return (
      <div className="user-profile error-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Failed to Load Profile</h2>
          <p className="error-message">{state.error}</p>
          <button className="retry-button" onClick={handleRetry}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Idle state - Initial state (not shown as fetch happens immediately)
  return (
    <div className="user-profile idle-container">
      <p>Ready to load profile...</p>
    </div>
  );
}

export default UserProfile;
