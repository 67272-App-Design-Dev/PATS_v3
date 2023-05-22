module Api::V1
  class CalendarController < ApiController
    before_action :set_visit, only: [:update, :create_treatment]
    before_action :check_login

    def pets
        render json: { pets: Pet.active.alphabetical.map {|pet| PetSerializer.new(pet)} }
    end

    def update
        @visit.update(visit_params)
        render json: VisitSerializer.new(@visit)
    end

    def create
        @visit = Visit.new(visit_params)
        @visit.save
        render json: VisitSerializer.new(@visit)
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_visit
      @visit = Visit.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def visit_params
      params.require(:visit).permit(:pet_id, :date, :weight)
    end
  end
end
