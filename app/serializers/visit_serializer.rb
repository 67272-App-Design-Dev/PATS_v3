class VisitSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :pet, :date, :total_charge

  attribute :pet do |object|
    PetSerializer.new(object.pet)
  end
end
