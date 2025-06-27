class AddArchivedToMessages < ActiveRecord::Migration[8.0]
  def change
    add_column :messages, :archived, :boolean
  end
end
