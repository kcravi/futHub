class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.text :body
      t.string :photos, array: true, default: []
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
