class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zipcode, null: false
      t.string :description, null: false
      t.string :phone_number
      t.string :website

      t.timestamps null: false
    end
  end
end
