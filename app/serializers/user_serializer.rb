class UserSerializer < ActiveModel::Serializer
  attributes :id,
   :username,
   :profile_photo
end
