import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactState {
  formData: ContactFormData;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  submittedAt: string | null;
}

const initialState: ContactState = {
  formData: {
    name: '',
    email: '',
    phone: '',
    message: '',
  },
  isSubmitting: false,
  submitSuccess: false,
  submitError: null,
  submittedAt: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<ContactFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setSubmitSuccess: (state, action: PayloadAction<boolean>) => {
      state.submitSuccess = action.payload;
    },
    setSubmitError: (state, action: PayloadAction<string | null>) => {
      state.submitError = action.payload;
    },
    setSubmittedAt: (state, action: PayloadAction<string | null>) => {
      state.submittedAt = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.submitSuccess = false;
      state.submitError = null;
      state.submittedAt = null;
    },
  },
});

export const {
  updateFormData,
  setSubmitting,
  setSubmitSuccess,
  setSubmitError,
  setSubmittedAt,
  resetForm,
} = contactSlice.actions;

export default contactSlice.reducer;
