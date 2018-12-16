class AddPhotosToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :photos, :string, array: true, default: []
  end
end
