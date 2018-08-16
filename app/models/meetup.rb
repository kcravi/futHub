class Meetup < ApplicationRecord
  validates :name, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :description, presence: true
  validates :lon, presence: true
  validates :lat, presence: true

end 
