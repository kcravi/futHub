class Api::V1::TeamsController < ApiController
  def index
    render json: Team.all
  end

  def show
    render json: {
      team: Team.find(params[:id])
    }
  end

end
