import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

interface Photo {
  id: string
  src: string
  alt: string
  title?: string
  category: string
  width: number
  height: number
}

interface PortfolioState {
  allPhotos: Photo[]
  filteredPhotos: Photo[]
  activeCategory: string
  likedPhotos: string[]
  lightboxPhoto: Photo | null
  loading: boolean
  error: string | null
}

const initialState: PortfolioState = {
  allPhotos: [],
  filteredPhotos: [],
  activeCategory: 'travel',
  likedPhotos: [],
  lightboxPhoto: null,
  loading: false,
  error: null,
}

// Image filenames for each category
const travelFilenames: string[] = [
  'travel3.jpg','travel4.jpg','travel6.jpg','travel7.jpg','travel16.jpg','travel17.jpg','travel20.jpg','travel22.jpg',
];

const wallpaperFilenames: string[] = [
  'wallpaper2.jpg','wallpaper3.jpg','wallpaper4.jpg','wallpaper6.jpg',
  'wallpaper8.jpg','wallpaper9.jpg','wallpaper10.jpg','wallpaper11.jpg','wallpaper12.jpg','wallpaper13.jpg','wallpaper14.jpg',
];

const weddingFilenames: string[] = [];

function makePhotoArray(filenames: string[], category: string): Photo[] {
  return filenames.map((filename, idx) => ({
    id: `${category}${idx+1}`,
    src: `/websiteimages/web${category}/${filename}`,
    alt: `${category.charAt(0).toUpperCase() + category.slice(1)} ${idx+1}`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} ${idx+1}`,
    category: category === 'wallpaper' ? 'wallpapers' : category === 'wedding' ? 'weddings' : category,
    width: 600,
    height: 400,
  }));
}

// Async thunk to load photos
export const loadPhotos = createAsyncThunk(
  'portfolio/loadPhotos',
  async () => {
    const photos: Photo[] = [
      ...makePhotoArray(travelFilenames, 'travel'),
      ...makePhotoArray(wallpaperFilenames, 'wallpaper'),
      ...makePhotoArray(weddingFilenames, 'wedding'),
    ];
    return photos;
  }
)

// Async thunk to download image
export const downloadImage = createAsyncThunk(
  'portfolio/downloadImage',
  async (photo: Photo) => {
    try {
      const extension = photo.src.split('.').pop()?.toLowerCase() || 'jpg'
      const filename = `${photo.title || 'image'}.${extension}`
      
      const link = document.createElement('a')
      link.href = photo.src
      link.download = filename
      link.setAttribute('crossorigin', 'anonymous')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      return { success: true, message: 'Download started' }
    } catch (err) {
      console.error('Download failed:', err)
      return { success: false, message: 'Download failed' }
    }
  }
)

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload
      state.filteredPhotos = state.allPhotos.filter((photo) => photo.category === action.payload)
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const index = state.likedPhotos.indexOf(action.payload)
      if (index > -1) {
        state.likedPhotos.splice(index, 1)
      } else {
        state.likedPhotos.push(action.payload)
      }
    },
    setLightboxPhoto: (state, action: PayloadAction<Photo | null>) => {
      state.lightboxPhoto = action.payload
    },
    closeLightbox: (state) => {
      state.lightboxPhoto = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Load Photos
      .addCase(loadPhotos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadPhotos.fulfilled, (state, action) => {
        state.loading = false
        state.allPhotos = action.payload
        state.filteredPhotos = action.payload.filter((photo) => photo.category === state.activeCategory)
      })
      .addCase(loadPhotos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load photos'
      })
      // Download Image
      .addCase(downloadImage.fulfilled, () => {
        // Download action doesn't change state, just triggers download
      })
      .addCase(downloadImage.rejected, (state, action) => {
        state.error = action.error.message || 'Download failed'
      })
  },
})

export const { setActiveCategory, toggleLike, setLightboxPhoto, closeLightbox, clearError } = portfolioSlice.actions
export default portfolioSlice.reducer
