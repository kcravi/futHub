class AddManagerIdToTeams < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :manager_id, :integer
  end
end
