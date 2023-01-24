class OwnersController < ApplicationController
  # A callback to set up an @owner object to work with 
  before_action :set_owner, only: [:show, :edit, :update, :destroy]
  before_action :check_login
  authorize_resource

  def index
    # finding all the active owners and paginating that list (will_paginate)
    @active_owners = Owner.active.alphabetical.paginate(page: params[:page]).per_page(15)
  end

  def show
    # authorize! :show, @owner
    # get all the pets for this owner
    @current_pets = @owner.pets.alphabetical.active.to_a
  end

  def new
    @owner = Owner.new
  end

  def edit
  end

  def create
    @owner = Owner.new(owner_params)
    @user = User.new(user_params)
    @user.owner!
    if !@user.save
      @owner.valid?
      render action: 'new'
    else
      @owner.user_id = @user.id
      if @owner.save
        flash[:notice] = "Successfully created #{@owner.proper_name}."
        redirect_to owner_path(@owner) 
      else
        render action: 'new'
      end      
    end
  end

  def update
    respond_to do |format|
      if @owner.update(owner_params)
        format.html { redirect_to(@owner, :notice => "Successfully updated #{@owner.proper_name}.") }
        format.json { respond_with_bip(@owner) }
      else
        format.html { render :action => "edit" }
        format.json { respond_with_bip(@owner) }
      end
    end
  end

  def destroy
    ## We don't allow destroy (will deactivate instead)
    @owner.deactive_owner_user_and_pets
    redirect_to owners_url, notice: "Successfully deactivated #{@owner.proper_name} along with associated user and pets."
  end

  private
    def set_owner
      @owner = Owner.find(params[:id])
    end

    def owner_params
      params.require(:owner).permit(:first_name, :last_name, :street, :city, :state, :zip, :phone, :email, :active, :username, :password, :password_confirmation)
    end

    def user_params      
      params.require(:owner).permit(:first_name, :last_name, :active, :username, :password, :password_confirmation)
    end

end
