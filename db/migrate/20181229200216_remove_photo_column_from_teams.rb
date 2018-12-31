class RemovePhotoColumnFromTeams < ActiveRecord::Migration[5.2]
  def change
    remove_column :teams, :photo, :string 
  end
end
