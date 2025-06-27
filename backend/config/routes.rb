Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "hl7_data", to: "api/v1/hl7_data#create"
    end
  end
  
  resources :appointments
  resources :tickets
  resources :messages do
    member do
      post 'link_ticket'
      delete 'unlink_ticket'
      post 'link_appointment'
      delete 'unlink_appointment'
    end
  end

  # ✅ Add custom routes for thread-level actions
  delete '/threads/:message_id', to: 'messages#destroy_thread'
  patch '/threads/:message_id/archive', to: 'messages#archive_thread'

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # Root path placeholder
  # root "posts#index"
end

