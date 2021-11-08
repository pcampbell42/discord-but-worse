Rails.application.routes.draw do

    root "static_pages#root"
    mount ActionCable.server, at: "/cable"

    namespace :api, defaults: {format: :json} do
      
        resource :session, only: [:create, :destroy]

        resources :users, only: [:create, :update, :show]

        resources :messages, only: [:index, :create, :update, :destroy] # only need index (for now)

        resources :servers, only: [:show, :index, :create, :update, :destroy]

        resources :memberships, only: [:create, :update, :destroy]

        resources :text_channels, only: [:create, :update, :destroy]

        resources :direct_messages, only: [:create, :update]
        
    end

end
