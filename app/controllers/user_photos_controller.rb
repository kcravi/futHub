class UserPhotosController < ApplicationController
  before_action :set_user

  def index
    @user_photos = @user.photos
    @current_user_photos = @current_user.photos
  end

  def show
    @photo = @user.photos[params[:id].to_i]
    @photo_id = params[:id].to_i
  end

  def create
    add_more_photos(photos_params[:photos])
    flash[:notice] = "Photo/s added succesfully."
    flash[:error] = "Failed uploading photos" unless @current_user.save
    redirect_to user_user_photos_path
    # redirect_to :back
  end

  def destroy
    remove_photo_at_index(params[:id].to_i)
    flash[:notice] = "Photo deleted succesfully."
    flash[:error] = "Failed deleting photo" unless @current_user.save
    redirect_to user_user_photos_path
  end

  private

  def set_user
    @current_user = current_user
    @user = User.find(params[:user_id])
  end

  def add_more_photos(new_photos)
    photos = @current_user.photos # copy the old photos
    photos += new_photos # concat old photos with new ones
    @current_user.photos = photos # assign back
  end

  def remove_photo_at_index(index)
    remain_photos = @current_user.photos # copy the array
    deleted_photo = remain_photos.delete_at(index) # delete the target image
    deleted_photo.try(:remove!) # delete image from S3
    @current_user.photos = remain_photos # re-assign back
    @current_user.remove_photos! if remain_photos.empty?
  end

  def photos_params
    params.require(:user).permit({photos: []})
  end
end
