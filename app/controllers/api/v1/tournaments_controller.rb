class Api::V1::TournamentsController < ApiController

  def index
    render json: {tournaments: Tournament.all.sort}
  end

  def show
    render json: {
      tournament: Tournament.find(params[:id])
    }
  end

  def new
    new_tournament = Tournament.new
  end

  def create
    new_tournament = Tournament.new(tournament_params)
    if new_tournament.save
      render json: { tournament: new_tournament }
    else
      render json: {errors: new_tournament.errors }
    end
  end

  private

  def tournament_params
    params
    .permit(
      :id,
      :name,
      :organizer,
      :street,
      :city,
      :state,
      :zipcode,
      :description,
      :fee,
      :awards,
      :status,
      :types,
      :website,
      :photo 
    )
  end
end
