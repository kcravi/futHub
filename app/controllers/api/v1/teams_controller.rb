class Api::V1::TeamsController < ApiController

  def index
    team = Team.all
    render json: team
  end

  def show
    render json: {
      team: Team.find(params[:id])
    }
  end

  def new
    new_team = Team.new
  end

  def create
    new_team = Team.new(team_params)
    if new_team.save
      render json: {team: new_team}
    else
      render json: {errors: new_team.errors}
    end
  end

  private

  def team_params
    params
    .require(:team)
    .permit(
      :id,
      :name,
      :city,
      :state,
      :zipcode,
      :description,
      :phone_number,
      :website
    )
  end

end
