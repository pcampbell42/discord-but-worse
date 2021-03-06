class Api::SessionsController < ApplicationController

    before_action :require_logged_out, only: [:create]
    before_action :require_logged_in, only: [:destroy]


    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if @user
            login(@user)
            render "api/users/show"
        else
            render json: ["Invalid email/password combination"], status: 401
        end
    end

    
    def destroy
        logout
        render json: {}
    end

end
