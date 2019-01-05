class TeamSerializer < ActiveModel::Serializer
  attributes :id,
   :name,
   :city,
   :state,
   :zipcode,
   :description,
   :website,
   :phone_number,
   :photos,
   :profile_photo,
   :url,
   :manager_id

   has_many :users
   has_many :posts
end
