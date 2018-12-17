FactoryBot.define do
  factory :team do
    sequence(:name) {|n| "team#{n}" }
    city "Boston"
    state "MA"
    zipcode "55555"
    description "boston based nepalese football club"

  end
end
