class AddDefaultFalseToMessagesArchived < ActiveRecord::Migration[7.0]
  def change
    change_column_default :messages, :archived, from: nil, to: false
  end
end

