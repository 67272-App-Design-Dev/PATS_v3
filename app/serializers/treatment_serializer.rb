class TreatmentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :procedure
end
