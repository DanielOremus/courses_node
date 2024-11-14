class StudentValidator {
  static schema = {
    firstName: {
      trim: true,
      notEmpty: {
        errorMessage: "First name is required",
      },
      escape: true,
    },
    lastName: {
      trim: true,
      notEmpty: {
        errorMessage: "Last name is required",
      },
      escape: true,
    },
    age: {
      notEmpty: {
        errorMessage: "Age is required",
        bail: true,
      },
      isInt: {
        options: {
          min: 16,
        },
        errorMessage: "Age must be greater or equal 16",
      },
      toInt: true,
    },
    averageScore: {
      notEmpty: {
        errorMessage: "Average Score is required",
        bail: true,
      },
      isFloat: {
        options: {
          min: 1,
          max: 12,
        },
        errorMessage:
          "Average Score must be greater or equal 1 and lower or equal 12",
      },
      toFloat: true,
    },
  }
}

export default StudentValidator
