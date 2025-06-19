class CreateTickets < ActiveRecord::Migration[8.0]
  def change
    create_table :tickets do |t|
      t.string :title
      t.string :message_id
      t.string :assigned_to
      t.string :status
      t.text :notes

      t.timestamps
    end
  end
end
