class PostsController < ApplicationController

  def create
    @current_user = current_user
    @post = Post.new(post_params)
    @post.user = @current_user

    if @post.save
      if @post.photos.size > 0
        @current_user.photos += @post.photos
        @current_user.save
      end
      flash[:notice] = "Post saved successfully."
      redirect_to user_path(@current_user)
    else
      flash[:alert] = "Failed to save post."
    end
  end

  def destroy
    @current_user = current_user
    remain_posts = @current_user.posts
    deleted_post = Post.find(params[:id])
    deleted_post.destroy
    deleted_post.photos.try(:remove!)
    flash[:notice] = "Post deleted succesfully."
    flash[:error] = "Failed deleting photo" unless @current_user.save
    redirect_to user_path(@current_user)
  end

  private

  def post_params
    params.require(:post).permit(:body, {photos: []})
  end

end
