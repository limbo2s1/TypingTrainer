import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generate } from 'random-words';

interface TextState {
  originalText: string;
  userInput: string;
  startTime: number | null;
  errors: number;
  wpm: number;
}

const generateRandomText = (): string => {
  return generate({ exactly: 15, join: ' ' }); 
};

const initialState: TextState = {
  originalText: generateRandomText(),
  userInput: '',
  startTime: null,
  errors: 0,
  wpm: 0,
};

const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
    incrementErrors: (state) => {
      state.errors += 1;
    },
    startTimer: (state) => {
      if (!state.startTime) {
        state.startTime = new Date().getTime();
      }
    },
    calculateWPM: (state) => {
      if (state.startTime) {
        const timeTaken = (new Date().getTime() - state.startTime) / 60000; 
        const wordsTyped = state.userInput.trim().split(/\s+/).length;
        state.wpm = Math.round(wordsTyped / timeTaken);
      }
    },
    reset: (state) => {
      state.userInput = '';
      state.startTime = null;
      state.errors = 0;
      state.wpm = 0;
      state.originalText = generateRandomText(); 
    },
  },
});

export const { setUserInput, incrementErrors, startTimer, calculateWPM, reset } = textSlice.actions;
export default textSlice.reducer;
