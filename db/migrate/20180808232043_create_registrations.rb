class CreateRegistrations < ActiveRecord::Migration[5.2]
  def change
    create_table :registrations do |t|
      t.belongs_to :user, null: false
      t.belongs_to :team, null: false
    end
  end
end
