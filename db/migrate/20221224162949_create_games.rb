class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :player1
      t.string :player2
      t.string :result
      t.string :status
      t.string :turn

      t.timestamps
    end
  end
end
