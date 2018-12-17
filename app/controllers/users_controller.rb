class UsersController < ApplicationController

  def show
    posts = current_user.posts
    @posts = posts.order(created_at: :desc)
    @post = Post.new
    @current_user = current_user
    @teams = []
    current_user.registrations.each do |registration|
      @teams << Team.where(id: registration.team.id)
    end
  end

end
