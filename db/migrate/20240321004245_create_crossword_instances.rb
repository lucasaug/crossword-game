class CreateCrosswordInstances < ActiveRecord::Migration[7.1]
  def change
    create_table :crossword_instances do |t|
      t.json :across, default: {}
      t.json :down, default: {}
      t.integer :width, null: false
      t.integer :height, null: false

      t.timestamps
    end
  end
end
