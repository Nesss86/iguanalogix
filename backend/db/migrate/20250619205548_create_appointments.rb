class CreateAppointments < ActiveRecord::Migration[8.0]
  def change
    create_table :appointments do |t|
      t.string :patient_name
      t.string :department
      t.datetime :appointment_time

      t.timestamps
    end
  end
end
