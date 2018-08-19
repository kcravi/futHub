class AddUrlToTeams < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :url, :string
  end
end
