class AddProfilePhotoToTeams < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :profile_photo, :string
  end
end
