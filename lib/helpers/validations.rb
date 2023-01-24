  module Validations
    def is_active_in_system(attribute)
      # This method tests to see if the value set for the attribute is
      # (a) in the system at all, and (b) is active, if the active flag
      # is applicable.  If that is not the case, it will add an error 
      # to stop validation process.
      
      # determine the class and id we need to work with
      klass = Object.const_get(attribute.to_s.capitalize)
      attr_id = "#{attribute.to_s}_id"
      
      # assuming the presence of the id is checked earlier, so return true 
      # if shoulda matchers are being used that might bypass that check
      return true if attr_id.nil?

      # determine the set of ids that might be valid
      if klass.respond_to?(:active)
        # if there is an active scope, take advantage of it
        all_active = klass.active.to_a.map{|k| k.id}
      else
        # if not, consider all the records as 'active'
        all_active = klass.to_a.map{|k| k.id}
      end

      # test to see if the id in question is in the set of valid ids 
      unless all_active.include?(self.send(attr_id))
        self.errors.add(attr_id.to_sym, "is not active in the system")
      end
    end
  end
