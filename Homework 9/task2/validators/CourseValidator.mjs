class CourseValidator {
  static schema = {
    name: {
      trim: true,
      notEmpty: {
        errorMessage: "Name is required",
        bail: true,
      },
      isLength: {
        options: {
          max: 10,
        },
        errorMessage: "Name must be up to 10 chars",
      },
      escape: true,
    },
    duration: {
      isInt: {
        options: {
          min: 7,
        },
        errorMessage: "Course must last at least 7 days",
      },
      toInt: true,
    },
    students: {
      trim: true,
      custom: {
        options: function (value) {
          if (Array.isArray(value)) return value.length > 0
          return value
        },
        errorMessage: "At least 1 student must be attached",
      },
    },
  }
}
export default CourseValidator
