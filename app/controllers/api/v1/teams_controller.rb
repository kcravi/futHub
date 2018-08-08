class Api::V1::TeamsController < ApiController
  def index
    render json: Team.all
  end

end
