class SeminarValidator {
  static schema = {
    topic: {
      trim: true,
      notEmpty: {
        errorMessage: "Topic is required",
      },
      isLength: {
        options: { min: 6, max: 50 },
        errorMessage: "Topic must be at least 6 and up to 20 chars",
      },
      escape: true,
    },
    responsibleStudent: {
      trim: true,
      notEmpty: {
        errorMessage: "Student must be attached",
      },
      escape: true,
    },
    lectionDuration: {
      isInt: {
        options: {
          min: 1,
        },
        errorMessage: "Lection must last at least 1 hour",
      },
      toInt: true,
    },
  }
}
export default SeminarValidator
