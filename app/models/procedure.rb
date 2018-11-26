require 'helpers/activeable'

class Procedure < ApplicationRecord
  include Activeable::InstanceMethods
  extend Activeable::ClassMethods

  # Search
  include PgSearch
  multisearchable :against => [:name, :description]

  # Relationships
  has_many :procedure_costs
  has_many :treatments
  has_many :visits, through: :treatments

  # Scopes (in addition to activeable ones)
  scope :alphabetical, -> { order('name') }

  # Validations
  validates_presence_of :name
  validates_numericality_of :length_of_time, only_integer: true, greater_than: 0
  
  # Other methods
  def current_cost
    curr_cost_of_procedure = self.procedure_costs.current    
    return nil if curr_cost_of_procedure.empty?
    curr_cost_of_procedure.first.cost
  end

  # Callbacks
  before_destroy do 
   check_if_ever_given_as_treatment
   @destroyable = false if errors.present?
   throw(:abort) if errors.present?
   remove_associated_procedure_costs
  end

  after_rollback :convert_to_inactive

  private
  def check_if_ever_given_as_treatment
    unless no_treatments?
      errors.add(:base, "Procedure cannot be deleted because previously used during visits, but its status has been set to inactive.")
    end
  end

  def no_treatments?
    self.treatments.empty?
  end

  def remove_associated_procedure_costs
    self.procedure_costs.each{ |pc| pc.destroy }
  end

  def convert_to_inactive
    if !@destroyable.nil? && @destroyable == false
      self.update_column(:active, false)
    end
    @destroyable = nil
  end

end
