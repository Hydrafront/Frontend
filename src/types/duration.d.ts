declare module 'duration' {
  class Duration {
    constructor(date1: Date, date2: Date);
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }
  export default Duration;
} 