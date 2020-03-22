class PasswordManager
  include ActiveModel::Model

  def initialize(user)
    @user = user
  end

  attr_reader :user

  def self.from_username(username)
    # Comment on handling usernames by downcasing
    new User.find_by_username(username)
  end

  def self.from_token(token)
    au = User.find_by_password_reset_token(token)
    if au.nil?
      raise Exceptions::NoPasswordResetToken
    else
      new au
    end
  end

  def send_email
    generate_token
    user.password_reset_sent_at = Time.zone.now
    user.save!
    PostOffice.reset_password_msg(user).deliver
  end

  def expired?
    user.password_reset_sent_at < 64.minutes.ago
  end

private

  def generate_token
    begin
      user.password_reset_token = SecureRandom.hex
    end while User.exists?(password_reset_token: user.password_reset_token)
  end

end
