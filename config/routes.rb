Rails.application.routes.draw do

    root "static_pages#root"

    namespace :api, defaults: {format: :json} do

        resource :session, only: [:create, :destroy]

        resources :users, only: [:create]

        resources :messages, only: [:index, :create, :update, :destroy]
        
    end

end
