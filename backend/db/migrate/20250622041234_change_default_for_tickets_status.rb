class ChangeDefaultForTicketsStatus < ActiveRecord::Migration[8.0]
  def change
    change_column_default :tickets, :status, 'open'
  end
end
