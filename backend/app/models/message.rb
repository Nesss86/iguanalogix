class Message < ApplicationRecord
  belongs_to :ticket, optional: true
  belongs_to :appointment, optional: true
  belongs_to :user

  validates :message_id, :content, :user_id, presence: true
end

