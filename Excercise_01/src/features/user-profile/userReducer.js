/**
 * User Profile Reducer - Finite State Machine (FSM) Pattern
 * 
 * Mục đích: Quản lý state fetch dữ liệu user profile một cách deterministic.
 * Tránh "impossible states" bằng cách chỉ cho phép các transitions hợp lệ.
 * 
 * FSM Diagram:
 * idle -> loading -> resolved
 *      \-> loading -> rejected
 */

// ==================== ACTION TYPES ====================
export const ACTIONS = {
  FETCH_INIT: 'FETCH_INIT',      // Bắt đầu fetch dữ liệu
  FETCH_SUCCESS: 'FETCH_SUCCESS', // Fetch thành công
  FETCH_FAILURE: 'FETCH_FAILURE', // Fetch thất bại
};

// ==================== INITIAL STATE ====================
/**
 * State bao gồm:
 * - status: 'idle' | 'loading' | 'resolved' | 'rejected'
 * - data: user data (null nếu chưa fetch)
 * - error: error message (null nếu không có lỗi)
 */
export const initialState = {
  status: 'idle',
  data: null,
  error: null,
};

// ==================== REDUCER FUNCTION ====================
/**
 * userReducer - Triển khai FSM logic
 * 
 * Quy tắc chuyển trạng thái (Finite State Machine):
 * 1. FETCH_INIT: Chỉ từ 'idle' hoặc 'resolved'/'rejected' (retry case)
 * 2. FETCH_SUCCESS: Chỉ từ 'loading'
 * 3. FETCH_FAILURE: Chỉ từ 'loading'
 * 
 * Nếu action không hợp lệ => trả về state cũ (no-op)
 */
export function userReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_INIT:
      // FSM: Chỉ có thể initiate fetch từ idle hoặc từ trạng thái settled (resolved/rejected)
      if (state.status === 'idle' || state.status === 'resolved' || state.status === 'rejected') {
        return {
          ...state,
          status: 'loading',
          error: null, // Clear previous error
        };
      }
      // Invalid transition - return old state
      console.warn(
        `[FSM Warning] Cannot transition from '${state.status}' to 'loading' with FETCH_INIT`
      );
      return state;

    case ACTIONS.FETCH_SUCCESS:
      // FSM: Chỉ có thể transition từ 'loading' -> 'resolved'
      if (state.status === 'loading') {
        return {
          ...state,
          status: 'resolved',
          data: action.payload, // Payload chứa user data
          error: null,
        };
      }
      // Invalid transition - return old state
      console.warn(
        `[FSM Warning] Cannot transition from '${state.status}' to 'resolved' with FETCH_SUCCESS`
      );
      return state;

    case ACTIONS.FETCH_FAILURE:
      // FSM: Chỉ có thể transition từ 'loading' -> 'rejected'
      if (state.status === 'loading') {
        return {
          ...state,
          status: 'rejected',
          data: null,
          error: action.payload, // Payload chứa error message
        };
      }
      // Invalid transition - return old state
      console.warn(
        `[FSM Warning] Cannot transition from '${state.status}' to 'rejected' with FETCH_FAILURE`
      );
      return state;

    default:
      return state;
  }
}

// ==================== HELPER FUNCTIONS ====================
/**
 * Tạo action object cho FETCH_INIT
 */
export const fetchInit = () => ({
  type: ACTIONS.FETCH_INIT,
});

/**
 * Tạo action object cho FETCH_SUCCESS
 * @param {Object} userData - User data từ API
 */
export const fetchSuccess = (userData) => ({
  type: ACTIONS.FETCH_SUCCESS,
  payload: userData,
});

/**
 * Tạo action object cho FETCH_FAILURE
 * @param {string} errorMessage - Error message
 */
export const fetchFailure = (errorMessage) => ({
  type: ACTIONS.FETCH_FAILURE,
  payload: errorMessage,
});
