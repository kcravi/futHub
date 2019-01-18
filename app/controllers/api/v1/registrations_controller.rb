class Api::V1::RegistrationsController < ApiController

  def create
    team = Team.find(params[:teamId])
    user = User.find(params[:currentUser][:id])

    registration = Registration.where(team: team, user: user)[0]
    if registration.nil?
      registration = Registration.new(team: team, user: user)
    end

    if registration.save
      msg = "#{user.username} joined #{team.name} successfully."
      render json: {members: team.users, success_msg: msg}
    else
      render json: {errors: team.errors}, status: :unprocessable_entity
    end
  end
end
