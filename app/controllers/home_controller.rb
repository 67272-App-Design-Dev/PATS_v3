class HomeController < ApplicationController
  def index
  end

  def about
  end

  def contact
  end

  def privacy
  end
  
  def search
    redirect_back(fallback_location: home_path) if params[:query].blank?
    @query = params[:query]
    # Basic search
    # @owners = Owner.search(@query)
    # @pets = Pet.search(@query)
    # @total_hits = @owners.size + @pets.size

    # Multisearch
    @results = PgSearch.multisearch(@query)
    @total_hits = @results.size
  end
end
