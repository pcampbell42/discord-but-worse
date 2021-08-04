class Api::MessagesController < ApplicationController

    before_action :require_logged_in, only: [:create, :update, :destroy]


    #--------------------- TEMP MESSAGES INDEX ---------------------
    def index
        @messages = Message.all.includes(:author)
        render :index
    end
    #---------------------------------------------------------------


    #--------------------- Not needed with websockets ---------------------

    def create
        @message = Message.new(message_params)
        @message.author_id = current_user.id
        if @message.save
            render :show
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def update
        @message = Message.find_by(id: params[:id])
        if @message.update(message_params)
            render :show
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        @message.destroy
        render json: {}
    end

    private
    def message_params
        params.require(:message).permit(:body)
    end

end
