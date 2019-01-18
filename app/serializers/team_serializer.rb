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
   :manager_id,
   :posts

   has_many :users
   # has_many :posts

   def posts
    object.posts.order(id: :desc)
   end
end
