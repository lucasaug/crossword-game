class CreateCrosswordInstances < ActiveRecord::Migration[7.1]
  def change
    create_table :crossword_instances do |t|
      t.json :across
      t.json :down
      t.integer :width
      t.integer :height

      t.timestamps
    end
  end
end
