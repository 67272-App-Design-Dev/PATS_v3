module Exceptions
  # a general cmuis error
  class Error < StandardError; end

  # a custom exception when no database for subdomain
  class NoDatabaseExists < Error; end

  # a custom exception when no dates passed to date range
  class NoDatesGiven < Error; end

  # a custom exception when no password reset token found
  class NoPasswordResetToken < Error; end

  # a custom exception when user is timed out
  class UserIsTimedOut < Error; end


end