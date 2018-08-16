class CreateMeetups < ActiveRecord::Migration[5.2]
  def change
    create_table :meetups do |t|
      t.string :name, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.text :description, null: false
      t.string :lon
      t.string :lat
      t.string :website
      t.string :photo
      t.integer :members
      
      t.timestamps null: false
    end
  end
end
