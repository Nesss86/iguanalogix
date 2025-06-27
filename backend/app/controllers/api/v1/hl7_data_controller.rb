module Api::V1
  class Hl7DataController < ApplicationController
    skip_before_action :verify_authenticity_token # if using this with POSTs

    def create
      # Log or parse the incoming HL7 or JSON data
      Rails.logger.info("Received HL7 Data: #{params.inspect}")

      # Save to DB or simulate processing
      render json: { status: 'success' }, status: :ok
    end
  end
end

