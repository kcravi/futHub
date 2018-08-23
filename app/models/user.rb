class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :authentication_keys => [:username]

  validates :email, uniqueness: true
  validates :username, uniqueness: true, presence: true

  has_many :teams, through: :registrations
  has_many :registrations

  mount_uploader :profile_photo, ProfilePhotoUploader

  def will_save_change_to_email?
    false
  end

  def will_save_change_to_profile_photo?
    false
  end
end
