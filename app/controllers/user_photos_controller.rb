class UserPhotosController < ApplicationController
  before_action :set_user

  def index
    @user = current_user
    @photos = current_user.photos
  end

  def show
    @photo = @user.photos[params[:id].to_i]
    @photo_id = params[:id].to_i
  end

  def create
    add_more_photos(photos_params[:photos])
    binding.pry
    flash[:error] = "Failed uploading photos" unless @user.save
    redirect_to user_user_photos_path
    # redirect_to :back
  end

  def destroy
    remove_photo_at_index(params[:id].to_i)
    flash[:error] = "Failed deleting photo" unless @user.save
    redirect_to user_user_photos_path
  end

  private

  def set_user
    @user = current_user
  end

  def add_more_photos(new_photos)
    photos = @user.photos # copy the old photos
    photos += new_photos # concat old photos with new ones
    @user.photos = photos # assign back
  end

  def remove_photo_at_index(index)
    remain_photos = @user.photos # copy the array
    deleted_photo = remain_photos.delete_at(index) # delete the target image
    deleted_photo.try(:remove!) # delete image from S3
    @user.photos = remain_photos # re-assign back
    @user.remove_photos! if remain_photos.empty?
  end

  def photos_params
    params.require(:user).permit({photos: []})
  end
end
