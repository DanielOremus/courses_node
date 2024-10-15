class Task {
  constructor() {}
  getSeason(monthNumber) {
    switch (monthNumber) {
      case 12:
      case 1:
      case 2:
        return "Winter"
      case 3:
      case 4:
      case 5:
        return "Spring"

      case 6:
      case 7:
      case 8:
        return "Summer"

      default:
        return "Autumn"
    }
  }
  getDayTime(hour) {
    if (hour < 6 || hour >= 18) return "Dinner"
    if (hour < 12) return "Morning"
    return "Afternoon"
  }
  getWeekDayName(weekDayNumber) {
    const obj = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    }
    return obj[weekDayNumber]
  }
}

export default new Task()
