class Team < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :city, presence: true
  validates :state, presence: true
  validates :description, presence: true

  has_many :registrations
  has_many :users, through: :registrations

  belongs_to :manager, class_name: "User"
  mount_uploaders :photos, PhotoUploader
  mount_uploader :profile_photo, ProfilePhotoUploader

end
