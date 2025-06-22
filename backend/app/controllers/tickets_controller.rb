class TicketsController < ApplicationController
  before_action :set_ticket, only: %i[ show update destroy ]

  # GET /tickets
  def index
    @tickets = Ticket.all
    render json: @tickets
  end

  # GET /tickets/1
  def show
    render json: @ticket
  end

  # POST /tickets
  def create
    @ticket = Ticket.new(ticket_params)

    if @ticket.save
      render json: @ticket, status: :created, location: @ticket
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tickets/1
  def update
    if @ticket.update(ticket_params)
      render json: @ticket
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tickets/1
  def destroy
    @ticket.destroy!
  end

  private

    def set_ticket
      @ticket = Ticket.find(params[:id])
    end

    def ticket_params
      params.require(:ticket).permit(
        :ticket_number,
        :patient_name,
        :reason_for_visit,
        :department,
        :comments,
        :message_id,
        :title,
        :assigned_to,
        :status,
        :notes
      )
    end
end

