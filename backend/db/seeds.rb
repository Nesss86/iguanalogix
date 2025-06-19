# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


Message.destroy_all

Message.create!([
  {
    message_id: "MSG001",
    patient_name: "John Doe",
    timestamp: Time.now - 2.hours,
    content: "MSH|^~\\&|ADT|HOSPITAL|LAB|HOSPITAL|202506191400||ADT^A01|MSG001|P|2.3\rPID|1||123456||DOE^JOHN||19800101|M|||123 MAIN ST^^TORONTO^ON^M1M1M1||555-1234"
  },
  {
    message_id: "MSG002",
    patient_name: "Jane Smith",
    timestamp: Time.now - 90.minutes,
    content: "MSH|^~\\&|ADT|HOSPITAL|LAB|HOSPITAL|202506191430||ADT^A01|MSG002|P|2.3\rPID|1||789012||SMITH^JANE||19900505|F|||456 QUEEN ST^^TORONTO^ON^M2M2M2||555-5678"
  },
  {
    message_id: "MSG003",
    patient_name: "Carlos Ramirez",
    timestamp: Time.now - 1.hour,
    content: "MSH|^~\\&|ORM|HOSPITAL|PHARM|HOSPITAL|202506191500||ORM^O01|MSG003|P|2.3\rPID|1||456789||RAMIREZ^CARLOS||19781212|M|||789 KING ST^^TORONTO^ON^M3M3M3||555-8765"
  },
  {
    message_id: "MSG004",
    patient_name: "Ayesha Patel",
    timestamp: Time.now - 30.minutes,
    content: "MSH|^~\\&|ORM|HOSPITAL|PHARM|HOSPITAL|202506191530||ORM^O01|MSG004|P|2.3\rPID|1||321654||PATEL^AYESHA||19921120|F|||321 YONGE ST^^TORONTO^ON^M4M4M4||555-4321"
  },
  {
    message_id: "MSG005",
    patient_name: "Liam O'Reilly",
    timestamp: Time.now - 10.minutes,
    content: "MSH|^~\\&|ORU|HOSPITAL|RAD|HOSPITAL|202506191550||ORU^R01|MSG005|P|2.3\rPID|1||987321||O'REILLY^LIAM||19850715|M|||987 BLOOR ST^^TORONTO^ON^M5M5M5||555-6789"
  }
])