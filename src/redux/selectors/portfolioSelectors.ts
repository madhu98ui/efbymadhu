import { RootState } from '../store'

// Selectors
export const selectAllPhotos = (state: RootState) => state.portfolio.allPhotos
export const selectFilteredPhotos = (state: RootState) => state.portfolio.filteredPhotos
export const selectActiveCategory = (state: RootState) => state.portfolio.activeCategory
export const selectLikedPhotos = (state: RootState) => state.portfolio.likedPhotos
export const selectLightboxPhoto = (state: RootState) => state.portfolio.lightboxPhoto
export const selectPortfolioLoading = (state: RootState) => state.portfolio.loading
export const selectPortfolioError = (state: RootState) => state.portfolio.error

// Derived selectors
export const selectIsPhotoLiked = (photoId: string) => (state: RootState) =>
  state.portfolio.likedPhotos.includes(photoId)

export const selectLightboxIndex = (state: RootState) => {
  if (!state.portfolio.lightboxPhoto) return -1
  return state.portfolio.filteredPhotos.findIndex(
    (photo) => photo.id === state.portfolio.lightboxPhoto?.id
  )
}

export const selectPhotosByCategory = (category: string) => (state: RootState) =>
  state.portfolio.allPhotos.filter((photo) => photo.category === category)
