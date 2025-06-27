class MessagesController < ApplicationController
  # GET /messages
  def index
    message_id = params[:message_id]
    Rails.logger.debug "📩 Index Params: #{params.inspect}"

    if message_id
      messages = Message.where(message_id: message_id).order(:created_at)
    else
      messages = Message.where.not(message_id: ['demo-thread', 'test-thread'])
                        .where(archived: false)
                        .order(created_at: :desc)
                        .limit(10)
    end

    render json: messages, each_serializer: MessageSerializer
  end

  # POST /messages
  def create
    Rails.logger.debug "🔥 Params received: #{params.inspect}"

    permitted = message_params
    Rails.logger.debug "📦 message_params: #{permitted.inspect}"

    user = User.find_by(id: permitted[:user_id])
    unless user
      Rails.logger.error "❌ User not found with ID: #{permitted[:user_id]}"
      render json: { error: "User not found" }, status: :unprocessable_entity and return
    end

    @message = Message.new(permitted.except(:user_id))
    @message.user = user

    Rails.logger.debug "📬 Built Message: #{@message.inspect}"

    if @message.save
      render json: @message, status: :created
    else
      Rails.logger.error "❌ Message save failed: #{@message.errors.full_messages}"
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/:id
  def destroy
    message = Message.find_by(id: params[:id])

    if message
      message.destroy
      render json: { message: 'Message deleted successfully' }, status: :ok
    else
      render json: { error: 'Message not found' }, status: :not_found
    end
  end

  private

  def message_params
    params.require(:message).permit(:message_id, :sender, :content, :user_id)
  end
end











