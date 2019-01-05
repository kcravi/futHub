class Team < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :city, presence: true
  validates :state, presence: true
  validates :description, presence: true

  has_many :registrations, dependent: :destroy
  has_many :users, through: :registrations

  has_many :posts, as: :postable, dependent: :destroy

  belongs_to :manager, class_name: "User"
  mount_uploaders :photos, PhotoUploader
  mount_uploader :profile_photo, ProfilePhotoUploader

end
