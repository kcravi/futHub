class RemoveZipcodeColumnFromTeams < ActiveRecord::Migration[5.2]
  def change
    remove_column :teams, :zipcode, :string 
  end
end
