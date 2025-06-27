class MessageSerializer < ActiveModel::Serializer
  attributes :id, :message_id, :content, :sender, :patient_name, :timestamp, :created_at, :user

  belongs_to :user

  def user
    {
      id: object.user.id,
      name: object.user.name
    }
  end
end
