# Controller for Team-Posts Only
class Api::V1::PostsController < ApiController

  def create
    team = Team.find(params[:team_id])
    post = team.posts.new(post_params)
    if post.save
      if post.photos.size > 0
        team.photos += post.photos
        team.save
      end
      render json: {post: post, success_msg: "Post added successfully"}
    else
      render json: {errors: post.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    team = Team.find(params[:team_id])
    remain_posts = team.posts
    deleted_post = Post.find(params[:id])
    deleted_post.destroy
    deleted_post.photos.try(:remove!)
    if deleted_post.destroy
      render json: {success_msg: 'Post Deleted Successfully'}
    else
      render json: {error: 'Post Failed to Delete'}, status: 422
    end
  end

  private

  def post_params
    params.permit(:body, {photos: []})
  end
end
