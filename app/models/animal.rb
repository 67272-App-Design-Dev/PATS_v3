require 'helpers/Activeable'

class Animal < ApplicationRecord
  extend Activeable::ClassMethods

  # Relationships
  has_many :pets
  has_many :animal_medicines
  has_many :medicines, through: :animal_medicines
  
  # Scopes
  scope :alphabetical, -> { order('name') }
   
  # Validations
  validates_presence_of :name

end
