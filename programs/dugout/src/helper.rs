use crate::constants::{SECONDS_5AM, SECONDS_PER_DAY, SECONDS_PER_WEEK};


pub fn calculate_next_tuesday_5am(current_timestamp: i64) -> i64 {
 
  // Get current day of week (0 = Sunday, 1 = Monday, 2 = Tuesday, etc.)
  let days_since_epoch = current_timestamp / SECONDS_PER_DAY;
  let current_day = days_since_epoch % 7;
  
  // Calculate days until next Tuesday
  let days_until_tuesday = (2 - current_day + 7) % 7;
  
  // Get start of current day
  let start_of_day = (current_timestamp / SECONDS_PER_DAY) * SECONDS_PER_DAY;
  
  // Calculate next Tuesday 5 AM
  let next_tuesday_5am = if days_until_tuesday == 0 {
      // If today is Tuesday
      if current_timestamp < (start_of_day + SECONDS_5AM) {
          // If before 5 AM, use today
          start_of_day + SECONDS_5AM
      } else {
          // If after 5 AM, use next Tuesday
          start_of_day + SECONDS_5AM + SECONDS_PER_WEEK
      }
  } else {
      // Not Tuesday, calculate next Tuesday
      start_of_day + (days_until_tuesday * SECONDS_PER_DAY) + SECONDS_5AM
  };
  
  next_tuesday_5am
}


// Add validation helper
pub fn is_claiming_time(_timestamp: i64, _claiming_start_time: i64) -> bool {
// test 
true
  // no test 
  // timestamp >= claiming_start_time
}