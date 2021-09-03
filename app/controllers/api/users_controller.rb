class Api::UsersController < ApplicationController

    before_action :require_logged_out, only: [:create]


    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end


    def show
        @user = User.find_by(id: params[:id])
        render "api/users/show_details"
    end


    private
    def user_params
        params.require(:user).permit(:email, :username, :password)
    end

end
