class Team < ApplicationRecord
  validates :name, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zipcode, presence: true
  validates :description, presence: true

  has_many :registrations
  has_many :users, through: :registrations
end
