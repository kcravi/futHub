class Api::V1::TeamPhotosController < ApiController
before_action :set_team

  def index
    photos = @team.photos
    render json: {photos: photos}
  end

  # def show
  #   photo = @team.photos(params[:id].to_i)
  #   binding.pry
  #   render json: {photo: photo}
  # end

  def create
    add_more_photos(team_params[:photos])
    if @team.save
      render json: {team_photos: @team.photos}
    else
      render json: {errors: @team.errors}, status: :unprocessable_entity
    end
  end

  private

  def add_more_photos(new_photos)
    photos = @team.photos # copy the old photos
    photos += new_photos # concat old photos with new ones
    @team.photos = photos # assign back
  end

  def set_team
    @team = Team.find(params[:team_id])
  end

  def team_params
    params.permit({photos: []})
  end

end
