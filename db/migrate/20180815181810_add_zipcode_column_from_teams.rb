class AddZipcodeColumnFromTeams < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :zipcode, :string
  end
end
