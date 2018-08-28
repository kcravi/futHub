class Api::V1::TeamsController < ApiController
   before_action :authenticate_user!, except: [:index, :show]

  def index
    # binding.pry
    # use meetup parser
    # render json: Team.all.sort
    render json: {
      teams: Team.all.sort
      # meetup_teams: MeetupParser.search
    }
  end

  def show
    render json: {
      team: Team.find(params[:id]),
      # meetup_team: MeetupParser.find(params[:id])
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
      render json: {errors: new_team.errors}, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    edit_team = Team.find(params[:id])
    edit_team.attributes = team_params
    if edit_team.save
      render json: {team: edit_team}
    else
      render json: {errors: edit_team.errors}, status: :unprocessable_entity
    end
  end

  # def search
  #   # teams = Team.where("city ILIKE ? OR description ILIKE ?", "%#{params['search_string']}%", "%#{params['search_string']}%")
  #   teams = Team.where("city ILIKE ?" ,  "%#{params['search_string']}%")
  #   render json: teams
  # end

  def destroy
    delete_team = Team.find(params[:id])
    if delete_team.destroy
      render json: {message: 'Deleted Successfully'}
    else
      render json: {error: 'Delete Failed'}, status: 422
    end
  end

  private

  def team_params
    params
    .permit(
      :id,
      :name,
      :city,
      :state,
      :zipcode,
      :description,
      :phone_number,
      :website,
      :photo
    )
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to root_path
    end
  end

end
