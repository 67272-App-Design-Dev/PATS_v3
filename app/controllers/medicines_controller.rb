class MedicinesController < ApplicationController

  before_action :set_medicine, only: [:show, :edit, :update, :destroy]
  before_action :check_login
  authorize_resource

  def index
    # get all visits in reverse chronological order, 10 per page
    @active_medicines = Medicine.active.alphabetical.paginate(page: params[:page]).per_page(10)
    @inactive_medicines = Medicine.inactive.alphabetical.paginate(page: params[:page]).per_page(10)
    # respond_to do |format|
      # format.html { @medicines = Medicine.alphabetical.paginate(page: params[:page]).per_page(10) }
      # format.json { @medicines = Medicine.alphabetical.all }
    # end
    
  end
  
  def show
    # get the cost history for this medicine
    @prices = @medicine.medicine_costs.chronological #.to_a.reverse
  end
  
  def new
    @medicine = Medicine.new
  end
  
  def create
    @medicine = Medicine.new(medicine_params)
    if @medicine.save
      flash[:notice] = "Successfully added #{@medicine.name}."
      redirect_to @medicine
    else
      render action: 'new'
    end
  end
  
  def edit
  end
  
  def update
    if @medicine.update(medicine_params)
      flash[:notice] = "Successfully updated #{@medicine.name}."
      redirect_to @medicine
    else
      render action: 'edit'
    end
  end
  
  def destroy
    if @medicine.destroy
      flash[:notice] = "Successfully removed #{@medicine.name}."
      redirect_to medicines_url
    else
      @prices = @medicine.medicine_costs.chronological
      render action: 'show'
    end
  end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_medicine
      @medicine = Medicine.find(params[:id])
    end
    # Never trust parameters from the scary internet, only allow the white list through.
    def medicine_params
      params.require(:medicine).permit(:name, :description, :stock_amount, :admin_method, :unit, :vaccine, :active)
    end
end

    