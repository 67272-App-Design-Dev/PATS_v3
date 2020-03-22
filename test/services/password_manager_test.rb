require 'test_helper'

class PasswordManagerTest < ActiveSupport::TestCase
  context "Within context" do
    setup do
      create_owners
      @pswd_manager = PasswordManager.new(@alex_user)
    end
    
    should "have a class method to find user by username" do
      seek_from_username = PasswordManager.from_username('alex')
      assert_equal @alex_user, seek_from_username.user
    end

    should "have a class method to find user by token" do
      @alex_user.update_attribute(:password_reset_token, 'DustyIsSleeping')
      seek_from_token = PasswordManager.from_token('DustyIsSleeping')
      assert_equal @alex_user, seek_from_token.user
      assert_raise Exceptions::NoPasswordResetToken do PasswordManager.from_token('DustyIsAwake'); end
    end

    should "set reset time and send email" do
      assert_nil @alex_user.password_reset_token
      @pswd_manager.send_email
      @alex_user.reload
      refute_nil @alex_user.password_reset_token
      assert_in_delta(Time.now.to_f, @alex_user.password_reset_sent_at.to_f, 10)
      # actual sending of email test has to be done in controller test
    end

    should "know if token is expired or not" do
      @alex_user.update_attribute(:password_reset_sent_at, Time.now)
      @alex_user.reload
      deny @pswd_manager.expired?
      @alex_user.update_attribute(:password_reset_sent_at, 1.day.ago)
      @alex_user.reload
      assert @pswd_manager.expired?
    end

  end
end
