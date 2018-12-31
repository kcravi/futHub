class AddPhotosToTeams < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :photos, :string, array: true, default: []
  end
end
