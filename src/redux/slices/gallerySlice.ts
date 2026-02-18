import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GalleryState {
  likedPhotos: Set<number>;
  selectedCategory: 'all' | 'travel' | 'wallpaper';
  selectedPhotoIndex: number | null;
  isLightboxOpen: boolean;
}

const initialState: GalleryState = {
  likedPhotos: new Set(),
  selectedCategory: 'all',
  selectedPhotoIndex: null,
  isLightboxOpen: false,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      if (state.likedPhotos.has(action.payload)) {
        state.likedPhotos.delete(action.payload);
      } else {
        state.likedPhotos.add(action.payload);
      }
    },
    setCategory: (state, action: PayloadAction<'all' | 'travel' | 'wallpaper'>) => {
      state.selectedCategory = action.payload;
    },
    openLightbox: (state, action: PayloadAction<number>) => {
      state.selectedPhotoIndex = action.payload;
      state.isLightboxOpen = true;
    },
    closeLightbox: (state) => {
      state.isLightboxOpen = false;
      state.selectedPhotoIndex = null;
    },
    nextPhoto: (state) => {
      if (state.selectedPhotoIndex !== null) {
        state.selectedPhotoIndex += 1;
      }
    },
    prevPhoto: (state) => {
      if (state.selectedPhotoIndex !== null && state.selectedPhotoIndex > 0) {
        state.selectedPhotoIndex -= 1;
      }
    },
    loadLikedPhotos: (state, action: PayloadAction<number[]>) => {
      state.likedPhotos = new Set(action.payload);
    },
  },
});

export const {
  toggleLike,
  setCategory,
  openLightbox,
  closeLightbox,
  nextPhoto,
  prevPhoto,
  loadLikedPhotos,
} = gallerySlice.actions;

export default gallerySlice.reducer;
