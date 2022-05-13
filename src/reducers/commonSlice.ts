import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ConfirmAction {
  title: string;
  text?: string;
  action: () => void;
}

interface AsyncAction {
  showOverlay?: boolean;
}

// Define a type for the slice state
interface CommonState {
  asyncAction?: AsyncAction;
  confirmAction?: ConfirmAction;
}

// Define the initial state using that type
const initialState: CommonState = {
  asyncAction: undefined,
  confirmAction: undefined
};

export const commonSlice = createSlice({
  name: 'common',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    asyncActionStart: (state, action: PayloadAction<boolean>) => {
      state.asyncAction = {showOverlay: action.payload};
    },
    asyncActionEnd: state => {
      state.asyncAction = undefined;
    },
    confirmAction: (state, action: PayloadAction<ConfirmAction>) => {
      state.confirmAction = action.payload;
    },
    confirmActionCancel: state => {
      state.confirmAction = undefined;
    }
  }
});

export const {asyncActionStart, asyncActionEnd, confirmAction, confirmActionCancel} = commonSlice.actions;

export default commonSlice.reducer;
