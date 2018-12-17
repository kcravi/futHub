require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:username) {|n| "user#{n}" }
    sequence(:email) {|n| "user#{n}@example.com" }
    password '123456'
    password_confirmation '123456'
  end
end
