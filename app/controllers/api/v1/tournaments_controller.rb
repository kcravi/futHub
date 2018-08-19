class Api::V1::TournamentsController < ApiController

  def index
    render json: {tournaments: Tournament.all.sort}
  end

  def show
    render json: {
      tournament: Tournament.find(params[:id])
    }
  end

end
