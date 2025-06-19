class CreateMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :messages do |t|
      t.string :message_id
      t.string :patient_name
      t.datetime :timestamp
      t.text :content

      t.timestamps
    end
  end
end
