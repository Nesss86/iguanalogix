class AddTicketAndAppointmentToMessages < ActiveRecord::Migration[8.0]
  def change
    add_reference :messages, :ticket, foreign_key: true
    add_reference :messages, :appointment, foreign_key: true
  end
end
