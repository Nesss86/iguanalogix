class Ticket < ApplicationRecord
  before_validation :set_default_status, on: :create
  after_initialize :set_default_status, if: :new_record?

  # Optional validation
  validates :status, inclusion: { in: %w[open pending closed] }

  private

  def set_default_status
    self.status ||= 'open'
  end
end


