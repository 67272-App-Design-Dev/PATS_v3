class PostOffice < ApplicationMailer
  default from: "vet@example.com"

  # def new_user_msg(user, pswd)
  #   @user = user
  #   @pswd = pswd
  #   mail(:to => user.email, :subject => "Welcome to PATS")
  # end

  def reset_password_msg(user)
    @user = user
    unless user.email.nil?
      mail(:to => user.email, :subject => "Request to reset password at PATS")
    end
  end

end