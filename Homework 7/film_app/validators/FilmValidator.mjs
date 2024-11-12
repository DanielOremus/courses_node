class FilmValidator {
  static schema = {
    title: {
      trim: true,
      escape: true,
      isLength: {
        options: {
          min: 3,
        },
        errorMessage: "Title must be at least 3 characters long",
      },
    },
    description: {
      trim: true,
      escape: true,
      isLength: {
        options: {
          min: 10,
        },
        errorMessage: "Description must be at least 10 characters long",
      },
    },
    genre: {
      notEmpty: {
        errorMessage: "Film must have at least 1 genre",
      },
    },

    releaseDate: {
      notEmpty: {
        errorMessage: "Release Date is required",
      },
    },
    trim: true,
    escape: true,
  }
}

export default FilmValidator
