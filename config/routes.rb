Rails.application.routes.draw do

    root "static_pages#root"

    namespace :api, defaults: {format: :json} do

        resource :session, only: [:create, :destroy]

        resources :users, only: [:show, :create]

        resources :messages, only: [:index, :create, :update, :destroy] # only need index (for now)

        resources :servers, only: [:show, :index, :create, :update, :destroy]

        resources :memberships, only: [:create, :destroy]
        
    end

end
