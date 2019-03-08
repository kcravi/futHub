class Api::V1::TeamsController < ApiController
   before_action :authenticate_user!, except: [:index, :show, :search]

  def index
    # use meetup parser
    # render json: Team.all.sort
    current_user_id = current_user.id if current_user
    render json: {
      teams: serialized_teams,
      current_user_id: current_user_id
      # meetup_teams: MeetupParser.search
    }
  end

  def show
    currentUser = current_user if current_user
    # admin_status = false
    # if user_signed_in?
    #   admin_status = current_user.admin?
    # end

    team = Team.find(params[:id])
    # users = team.users
    render json: {
      team: serialized_team,
      current_user: currentUser,
      # admin_status: admin_status,
      # users: users
      # meetup_team: MeetupParser.find(params[:id])
    }
  end

  def new
    new_team = Team.new
  end

  def create
    new_team = Team.new(team_params)
    new_team.manager_id = current_user.id
    new_team.users << current_user
    # current_user.update_attribute :admin, true
    if new_team.save
      success_msg = "#{new_team.name.capitalize} successfully created"
      render json: {team: new_team, success_msg: success_msg}
    else
      render json: {errors: new_team.errors}, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    edit_team = Team.find(params[:id])
    edit_team.attributes = team_params

    if edit_team.save
      success_msg = "#{edit_team.name.capitalize} successfully updated"
      render json: {team: edit_team, success_msg: success_msg}
    else
      render json: {errors: edit_team.errors}, status: :unprocessable_entity
    end
  end

  def search
    teams = Team.where("name ILIKE ? AND city ILIKE ? AND state ILIKE ? AND zipcode ILIKE ?",  "%#{params['name']}%", "%#{params['city']}%", "%#{params['state']}%", "%#{params['zipcode']}%")
    render json: teams
  end

  def destroy
    delete_team = Team.find(params[:id])
    if delete_team.destroy
      render json: {success_msg: "#{delete_team.name.capitalize} deleted successfully"}
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
      :profile_photo
    )
  end

  def serialized_teams
    ActiveModel::Serializer::ArraySerializer.new(Team.all.sort, each_serializer: TeamSerializer)
  end

  def serialized_team
    TeamSerializer.new(Team.find(params[:id]))
  end

  # def authorize_user
  #   if !user_signed_in? || !current_user.admin?
  #     flash[:notice] = "You do not have access to this page."
  #     redirect_to root_path
  #   end
  # end

end
