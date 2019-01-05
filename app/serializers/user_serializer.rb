class UserSerializer < ActiveModel::Serializer
  attributes :id,
   :username,
   :profile_photo

   has_many :posts
end
