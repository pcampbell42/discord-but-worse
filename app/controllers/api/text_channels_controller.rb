class Api::TextChannelsController < ApplicationController

    def show
        @text_channel = TextChannel.find_by(id: params[:id])
        render "api/text_channels/show_details"
    end

    def create
        @text_channel = TextChannel.new(text_channel_params)
        if @text_channel.save
            render :show
        else
            render json: @text_channel.errors.full_messages, status: 422
        end
    end

    def destroy
        @text_channel = TextChannel.find_by(id: params[:id])
        @text_channel.destroy
        render json: {}
    end

    private
    def text_channel_params
        params.require(:text_channel).permit(:name, :server_id)
    end

end
