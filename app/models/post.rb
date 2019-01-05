class Post < ApplicationRecord
  belongs_to :postable, polymorphic: true

  mount_uploaders :photos, PhotoUploader
end
