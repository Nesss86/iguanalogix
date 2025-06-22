class MessagesController < ApplicationController
  before_action :set_message, only: %i[show update destroy]

  # GET /messages?page=1&per_page=10
  def index
    page = params[:page].to_i > 0 ? params[:page].to_i : 1
    per_page = params[:per_page].to_i > 0 ? params[:per_page].to_i : 10

    total_count = Message.count

    @messages = Message
                  .order(created_at: :desc)
                  .offset((page - 1) * per_page)
                  .limit(per_page)

    render json: {
      messages: @messages,
      total_count: total_count,
      current_page: page,
      per_page: per_page
    }
  end

  # GET /messages/1
  def show
    render json: @message
  end

  # POST /messages
  def create
    @message = Message.new(message_params)

    if @message.save
      render json: @message, status: :created, location: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /messages/1
  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  def destroy
    @message.destroy!
  end

  private

    def set_message
      @message = Message.find(params[:id])
    end

    def message_params
      params.require(:message).permit(:message_id, :patient_name, :content, :timestamp, :sender)
    end
end


