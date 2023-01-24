require 'helpers/activeable'
require 'helpers/validations'

class Pet < ApplicationRecord
  include Validations
  include Activeable::InstanceMethods
  extend Activeable::ClassMethods

  # Relationships
  # -----------------------------
  belongs_to :animal
  belongs_to :owner
  has_many :visits
  has_many :dosages, through: :visits
  has_many :treatments, through: :visits
  # has_many :notes, as: :notable


  # Scopes
  # -----------------------------
  # order pets by their name
  scope :alphabetical, -> { order('name') }
  # get all the pets we treat (not moved away or dead)
  # the code below now replaced with AppHelpers::Activeable::ClassMethods
  ## scope :active, -> { where(active: true) }
  ## ... which is really the same as (but shorter):
  ## def self.active
  ##   where(active: true)
  ## end
  ## get all the pets we heave treated that moved away or died
  ## scope :inactive, -> { where.not(active: true) }
  # get all the female pets
  scope :females, -> { where(female: true) }
  # get all the male pets
  scope :males, -> { where(female: false) }

  # get all the pets for a particular owner
  scope :for_owner, ->(owner_id) { where("owner_id = ?", owner_id) }
  # get all the pets who are a particular animal type
  scope :by_animal, ->(animal_id) { where("animal_id = ?", animal_id) }
  # get all the pets born before a certain date
  scope :born_before, ->(dob) { where('date_of_birth < ?', dob) }
  # find all pets that have a name like some term or are and animal like some term
  scope :search, ->(term) { joins(:animal).where('pets.name LIKE ?', "#{term}%").order("pets.name") }


  # Validations
  # -----------------------------
  # System note:   not requiring DOB because may not be known (e.g., adopted pet)
  # Teaching note: could have done validates_presence_of :name, but using a different
  #                method discussed in class to show alternative
  #
  # First, make sure a name exists
  validates :name, presence: true
  # Second, make sure the animal is one of the types PATS treats
  validate :animal_type_treated_by_PATS
  # Third, make sure the owner_id is in the PATS system 
  validate :owner_is_active_in_PATS_system
  

  # Misc Methods and Constants
  # -----------------------------
  # a method to get owner name in last, first format
  def gender
    self.female ? "Female" : "Male"
  end  

  # Use private methods to execute the custom validations
  # -----------------------------
  private
  def animal_type_treated_by_PATS
    is_active_in_system(:animal)
  end
  
  def owner_is_active_in_PATS_system
    is_active_in_system(:owner)
  end
end
