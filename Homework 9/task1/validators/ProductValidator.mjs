class ProductValidator {
  static schema = {
    title: {
      trim: true,
      notEmpty: {
        errorMessage: "Title is required",
      },
      escape: true,
    },
    price: {
      isNumeric: {
        errorMessage: "Price must be a number",
        bail: true,
      },
      isInt: {
        options: {
          min: 1,
        },
        errorMessage: "Price must be positive",
      },
      toInt: true,
    },
    amount: {
      isNumeric: {
        errorMessage: "Amount must be a number",
        bail: true,
      },
      isInt: {
        options: {
          min: 0,
        },
        errorMessage: "Amount must be greater or equal 0",
      },
      toInt: true,
    },
  }
}

export default ProductValidator
