module Api::V1
  class VisitShowController < ApiController
    before_action :set_visit, only: [:create_dosage, :medicines_for_visit, :create_treatment]
    before_action :check_login

    # for dosages
    def create_dosage
      @dosage = Dosage.new(dosage_params)
      @dosage.visit = @visit
      if @dosage.save
        result = @dosage.attributes
        # serialize with string name
        result[:medicine_name] = @dosage.medicine.name
        render json: result.to_json
      else
        render json: { errors: @dosage.errors.messages }, status: 400
      end
    end

    def delete_dosage
      @dosage = Dosage.find(params[:dosage_id])
      if @dosage.destroy
        render json: { message: "success!" }
      else
        render json: { errors: @dosage.errors.messages }, status: 500
      end
    end

    def medicines_for_visit
      @pet = @visit.pet
      render json: { medicines: Medicine.for_animal(@pet.animal.id).active.alphabetical.to_a }
    end

    # for treatements
    def create_treatment
      @treatment = Treatment.new(treatment_params)
      @treatment.visit = @visit
      if @treatment.save
        render json: TreatmentSerializer.new(@treatment)
      else
        render json: { errors: @dosage.errors.messages }, status: 400
      end
    end

    def procedures
      render json: { procedures: Procedure.alphabetical.to_a }
    end

    private

    def set_visit
      @visit = Visit.find(params[:id])
    end

    def dosage_params
      params.require(:dosage).permit(:medicine_id, :units_given, :discount)
    end

    def treatment_params
      params.require(:treatment).permit(:procedure_id, :successful, :discount)
    end

  end
end
