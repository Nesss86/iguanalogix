# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_06_23_130329) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.string "patient_name"
    t.string "department"
    t.datetime "appointment_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.string "message_id"
    t.string "patient_name"
    t.datetime "timestamp"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "sender"
    t.bigint "ticket_id"
    t.bigint "appointment_id"
    t.boolean "archived", default: false
    t.bigint "user_id", null: false
    t.index ["appointment_id"], name: "index_messages_on_appointment_id"
    t.index ["ticket_id"], name: "index_messages_on_ticket_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "tickets", force: :cascade do |t|
    t.string "title"
    t.string "message_id"
    t.string "assigned_to"
    t.string "status", default: "open"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ticket_number"
    t.string "patient_name"
    t.string "reason_for_visit"
    t.string "department"
    t.text "comments"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "messages", "appointments"
  add_foreign_key "messages", "tickets"
  add_foreign_key "messages", "users"
end
