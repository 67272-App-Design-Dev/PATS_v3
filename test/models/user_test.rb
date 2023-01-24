require 'test_helper'

class UserTest < ActiveSupport::TestCase
  should have_secure_password

  # test validations
  should validate_presence_of(:username)
  should validate_uniqueness_of(:username).case_insensitive

  should allow_value("vet").for(:role)
  should allow_value("assistant").for(:role)
  should allow_value("owner").for(:role)
  
  # context
  context "Within context" do
    setup do
      create_vet_users
    end
    
    teardown do
      destroy_vet_users
    end

    should "require users to have unique, case-insensitive usernames" do
      # already test on line 8, but doing it long way here
      assert_equal "jordan", @jordan.username
      # try to switch to Becca's username 'becca'
      @jordan.username = "BECCA"
      deny @jordan.valid?, "#{@jordan.username}"
    end

    should "have role methods and recognize all three roles" do
      egruberman = FactoryBot.build(:user)
      alex_user = FactoryBot.build(:user, first_name: "Alex", last_name: "Heimann", username: "alex", role: "owner")
      assert egruberman.assistant?
      deny egruberman.vet?
      assert alex_user.owner?
      deny alex_user.assistant?
      assert @becca.vet?
      deny @becca.assistant?
    end

    should "have name methods for users" do
      assert_equal "Jordan Stapinski", @jordan.proper_name
      assert_equal "Kern, Becca", @becca.name
    end

    should "allow user to authenticate with password" do
      assert @jordan.authenticate("secret")
      deny @jordan.authenticate("notsecret")
    end

    should "require a password for new users" do
      bad_user = FactoryBot.build(:user, username: "tank", password: nil)
      deny bad_user.valid?
    end
    
    should "require passwords to be confirmed and matching" do
      bad_user_1 = FactoryBot.build(:user, username: "tank", password: "secret", password_confirmation: nil)
      deny bad_user_1.valid?
      bad_user_2 = FactoryBot.build(:user, username: "tank", password: "secret", password_confirmation: "sauce")
      deny bad_user_2.valid?
    end
    
    should "require passwords to be at least four characters" do
      bad_user = FactoryBot.build(:user, username: "tank", password: "no")
      deny bad_user.valid?
    end

    should "have class method to handle authentication services" do
      assert User.authenticate('jordan', 'secret')
      deny User.authenticate('jordan', 'notsecret')
    end

  end
end
