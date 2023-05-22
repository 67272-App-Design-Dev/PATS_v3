class PetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :animal, :owner
end
