class AddSenderToMessages < ActiveRecord::Migration[8.0]
  def change
    add_column :messages, :sender, :string
  end
end
