class Tournament < ApplicationRecord
  validates :name, presence: true
  validates :organizer, presence: true
  validates :description, presence: true
  validates :street, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zipcode, presence: true
  validates :fee, presence: true
  validates :awards, presence: true
  validates :status, presence: true
  validates :types, presence: true

  mount_uploader :photo, PhotoUploader
end
