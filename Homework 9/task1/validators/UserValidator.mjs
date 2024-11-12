class UserValidator {
  static schema = {
    userName: {
      trim: true,
      notEmpty: {
        errorMessage: "Username is required",
        bail: true,
      },
      escape: true,
    },
    password: {
      trim: true,
      notEmpty: {
        errorMessage: "Password is required",
        bail: true,
      },
      isLength: {
        options: {
          min: 8,
          max: 16,
        },
        errorMessage: "Password must be at least 8 and up to 16 chars long",
      },
      escape: true,
    },
  }
}

export default UserValidator
