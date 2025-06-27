# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear data first
Message.destroy_all
Appointment.destroy_all
Ticket.destroy_all
User.destroy_all

# Nurses
nurses = [
  { name: "Nurse Jamie", role: "nurse" },
  { name: "Nurse Riley", role: "nurse" },
  { name: "Nurse Taylor", role: "nurse" }
]

# Doctors
doctors = [
  { name: "Dr. Smith", role: "doctor" },
  { name: "Dr. Patel", role: "doctor" },
  { name: "Dr. Chen", role: "doctor" }
]

users = (nurses + doctors).map { |attrs| User.create!(attrs) }
puts "✅ Seeded #{User.count} users."

# Get specific users for ticket/message linking
user_lookup = User.all.index_by(&:name)

# Appointments
appointments_data = [
  { patient_name: "John Doe", appointment_time: Time.now + 1.day, department: "General" },
  { patient_name: "Jane Smith", appointment_time: Time.now + 2.days, department: "Pediatrics" },
  { patient_name: "Carlos Ramirez", appointment_time: Time.now + 3.days, department: "Cardiology" }
]
appointments = Appointment.create!(appointments_data)
puts "✅ Seeded #{appointments.count} appointments."

# Tickets
tickets_data = [
  {
    title: "Headache Consultation",
    message_id: "thread-001",
    assigned_to: "Dr. Smith",
    status: "open",
    notes: "Patient has recurring headaches.",
    ticket_number: "TICKET001",
    patient_name: "John Doe",
    reason_for_visit: "Headache",
    department: "General",
    comments: "Recommended follow-up in 1 week."
  },
  {
    title: "Routine Checkup",
    message_id: "thread-002",
    assigned_to: "Nurse Riley",
    status: "open",
    notes: "Standard annual physical.",
    ticket_number: "TICKET002",
    patient_name: "Jane Smith",
    reason_for_visit: "Checkup",
    department: "Pediatrics",
    comments: "No concerns raised."
  }
]
tickets = Ticket.create!(tickets_data)
puts "✅ Seeded #{tickets.count} tickets."

# Messages (linked to a user)
messages_data = [
  {
    message_id: "thread-001",
    patient_name: "John Doe",
    timestamp: Time.now - 2.hours,
    content: "Patient reports migraines.",
    sender: "Dr. Smith",
    user_id: user_lookup["Dr. Smith"].id
  },
  {
    message_id: "thread-002",
    patient_name: "Jane Smith",
    timestamp: Time.now - 90.minutes,
    content: "Follow-up scheduled for Monday.",
    sender: "Nurse Riley",
    user_id: user_lookup["Nurse Riley"].id
  }
]
Message.create!(messages_data)
puts "✅ Seeded #{messages_data.count} messages."
