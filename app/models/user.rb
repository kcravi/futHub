class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :authentication_keys => [:username]

  validates :email, uniqueness: true
  validates :username, uniqueness: true, presence: true

  has_many :teams, through: :registrations
  has_many :registrations, dependent: :destroy

  has_many :teams, foreign_key: :manager_id
  has_many :posts
  # has_many :photos
  # accepts_nested_attributes_for :photos

  mount_uploader :profile_photo, ProfilePhotoUploader
  mount_uploaders :photos, PhotoUploader

  # def will_save_change_to_email?
  #   false
  # end
  #
  # def will_save_change_to_profile_photo?
  #   false
  # end
end
