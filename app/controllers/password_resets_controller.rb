class PasswordResetsController < ApplicationController
  def new
  end

  def create
    password_reset = PasswordManager.from_username(params[:username])
    if password_reset.user
      password_reset.send_email
      redirect_to home_path, notice: "Email sent with password reset instructions."
    else
      redirect_to new_password_reset_path, alert: "Username is not registered in the system."
    end
  end

  def edit
    password_reset = PasswordManager.from_token(params[:id])
    @user = password_reset.user
  end

  def update
    password_reset = PasswordManager.from_token(params[:id])
    @user = password_reset.user
    if password_reset.expired?
      redirect_to new_password_reset_path, alert: "Password reset has expired."
    elsif @user.update_attributes(reset_params)
      redirect_to home_path, notice: "Password has been changed; login now with new password."
    else
      render :edit
    end
  end

  def reset_params
    params.require(:user).permit(:password, :password_confirmation)  
  end
end