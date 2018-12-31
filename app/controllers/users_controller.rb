class UsersController < ApplicationController

  def show
    user = User.find(params[:id])
    posts = user.posts
    @posts = posts.order(created_at: :desc)
    @post = Post.new
    @current_user = current_user
    @teams = []
    user.registrations.each do |registration|
      @teams << Team.where(id: registration.team.id)
    end
  end

end
