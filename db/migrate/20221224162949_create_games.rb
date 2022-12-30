class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :player1
      t.integer :player2
      t.string :board
      t.string :result
      t.string :status
      t.integer :turn

      t.timestamps
    end
  end
end
