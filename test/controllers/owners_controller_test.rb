require 'test_helper'

class OwnersControllerTest < ActionDispatch::IntegrationTest
  setup do
    login_vet
    @owner = FactoryBot.create(:owner)
  end

  test "should get index" do
    get owners_path
    assert_response :success
    assert_not_nil assigns(:active_owners)
  end

  test "should get new" do
    get new_owner_path
    assert_response :success
    assert_not_nil assigns(:owner)
  end

  test "should create owner" do
    assert_difference('Owner.count') do
      # post owners_path, params: { owner: { active: @owner.active, city: @owner.city, email: "eheimann@example.com", first_name: "Eric", last_name: @owner.last_name, phone: @owner.phone, state: @owner.state, street: @owner.street, zip: @owner.zip } }
      post owners_path, params: { owner: { username: "eric", password: "secret", password_confirmation: "secret", active: @owner.active, city: @owner.city, email: "eheimann@example.com", first_name: "Eric", last_name: @owner.last_name, phone: @owner.phone, state: @owner.state, street: @owner.street, zip: @owner.zip } }
    end

    assert_redirected_to owner_path(Owner.last)
  end
  
  test "should not create if owner or user invalid" do
    # invalid user
    post owners_path, params: { owner: { username: nil, password: "secret", password_confirmation: "secret", active: @owner.active, city: @owner.city, email: "eheimann@example.com", first_name: "Eric", last_name: @owner.last_name, phone: @owner.phone, state: @owner.state, street: @owner.street, zip: @owner.zip } }
    # invalid owner
    post owners_path, params: { owner: { username: "eric", password: "secret", password_confirmation: "secret", active: @owner.active, city: @owner.city, email: "eheimann@example.com", first_name: "Eric", last_name: @owner.last_name, phone: @owner.phone, state: "of confusion", street: @owner.street, zip: nil } }
  end
  
  test "should show owner" do
    get owner_path(@owner)
    assert_response :success
  end

  test "should get edit" do
    get edit_owner_path(@owner)
    assert_response :success
  end

  test "should update owner" do
    patch owner_path(@owner), params: { owner: { active: @owner.active, city: @owner.city, email: @owner.email, first_name: "Alexander", last_name: @owner.last_name, phone: @owner.phone, state: @owner.state, street: @owner.street, zip: @owner.zip } }
    assert_redirected_to owner_path(@owner)

    patch owner_path(@owner), params: { owner: { active: @owner.active, city: @owner.city, email: @owner.email, first_name: nil, last_name: @owner.last_name, phone: @owner.phone, state: @owner.state, street: @owner.street, zip: @owner.zip } }
  end

  test "should not destroy owner" do
    assert @owner.active
    ## We no longer allow owners to be destroyed
    assert_difference('Owner.count', 0) do
      delete owner_path(@owner)
    end
    ## ... but they are now made inactive
    @owner.reload
    deny @owner.active
    # assert_redirected_to owners_path
  end
end
