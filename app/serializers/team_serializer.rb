class TeamSerializer < ActiveModel::Serializer
  attributes :id,
   :name,
   :city,
   :state,
   :zipcode,
   :description,
   :website,
   :phone_number,
   :photo,
   :url

   has_many :users 
end
