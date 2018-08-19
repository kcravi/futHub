class CreateTournaments < ActiveRecord::Migration[5.2]
  def change
    create_table :tournaments do |t|
      t.string :name, null: false
      t.string :organizer, null: false
      t.text :description, null: false
      t.string :street, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zipcode, null: false
      t.string :fee, null: false
      t.string :awards, null: false
      t.string :status, null: false
      t.string :types, null: false
      t.string :website
      t.string :photo

      t.timestamps null: false
    end
  end
end
