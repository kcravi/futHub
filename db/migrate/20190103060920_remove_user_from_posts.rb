class RemoveUserFromPosts < ActiveRecord::Migration[5.2]
  def change
    remove_reference :posts, :user, index: true
    add_reference :posts, :postable, polymorphic: true, index: true
  end
end
