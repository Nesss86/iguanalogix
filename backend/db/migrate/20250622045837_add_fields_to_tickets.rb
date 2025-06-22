class AddFieldsToTickets < ActiveRecord::Migration[8.0]
  def change
    add_column :tickets, :ticket_number, :string
    add_column :tickets, :patient_name, :string
    add_column :tickets, :reason_for_visit, :string
    add_column :tickets, :department, :string
    add_column :tickets, :comments, :text
  end
end
